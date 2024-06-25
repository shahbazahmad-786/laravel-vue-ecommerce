<template>
    <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per Page</span>
                <select @change="getUsers(null)" v-model="perPage"
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                    <option v-for="option of ADMIN_PER_PAGE_OPTIONS" :value="option">
                        {{ option }}
                    </option>
                </select>
                <span class="ml-3">Found {{ users.total }} users</span>
            </div>
            <div>
                <input v-model="search" @keyup="getUsers(null)"
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Type to Search users">
            </div>
        </div>

        <table class="table-auto w-full">
            <thead>
                <tr class="capitalize">
                    <TableHeaderCell v-for="thName of tableHeaderName" :field="thName.field" :sort-field="sortField"
                        :sort-direction="sortDirection" @click="sortUsers(thName.sort)">
                        {{ thName.field }}
                    </TableHeaderCell>
                </tr>
            </thead>
            <!-- Table-Body -->
            <TableBody :users="users" @changeUserRole="changeUserRole" @deleteUser="deleteUser" />
            <!--/ Table-Body -->
        </table>

        <!-- Pagination -->
        <Pagination :users="users" @getForPage="getForPage" />
        <!--/ Pagination -->
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Pagination from './Pagination.vue';
import TableBody from './TableBody.vue';
import {
    ADMIN_USERS_PER_PAGE,
    ADMIN_USERS_SORT_FIELD,
    ADMIN_USERS_SORT_DIRECTION,
    ADMIN_PER_PAGE_OPTIONS
} from "../../../../constants";

const store = useStore();
const users = computed(() => store.state.users);
const search = ref('');
const perPage = ref(ADMIN_USERS_PER_PAGE);
const sortField = ref(ADMIN_USERS_SORT_FIELD);
const sortDirection = ref(ADMIN_USERS_SORT_DIRECTION);
const tableHeaderName = [
    { 'field': 'id', 'sort': 'id' },
    { 'field': 'name', 'sort': 'name' },
    { 'field': 'email', 'sort': 'email' },
    { 'field': 'role', 'sort': 'is_admin' },
    { 'field': 'created_at', 'sort': 'created_at' },
    { 'field': 'actions', 'sort': 'id' }
];

const getUsers = (url = null) => {
    store.dispatch("getUsers", {
        url,
        search: search.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
    });
}

onMounted(() => getUsers());

const getForPage = (ev, link) => {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }

    getUsers(link.url);
}

const sortUsers = (field) => {
    if (field === sortField.value) {
        if (sortDirection.value === 'desc') {
            sortDirection.value = 'asc';
        } else {
            sortDirection.value = 'desc';
        }
    } else {
        sortField.value = field;
        sortDirection.value = 'asc';
    }

    getUsers();
}

const deleteUser = (user) => {
    if (!confirm(`Are you sure you want to delete the user?`)) {
        return
    }
    store.dispatch('deleteUser', user.id)
        .then(() => {
            store.commit("notify", {
                'message': 'User deleted successfully',
                'type': 'success',
            });
            getUsers();
        });
}

const changeUserRole = (user) => {
    if (!confirm(`Are you sure you want to change role?`)) {
        return
    }
    store.dispatch('changeUserRole', user.id)
        .then(() => {
            store.commit("notify", {
                'message': 'Role changed successfully',
                'type': 'success',
            });
            getUsers();
        });
}
</script>

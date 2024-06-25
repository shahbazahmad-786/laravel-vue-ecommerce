<template>
    <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per Page</span>
                <select @change="getOrders(null)" v-model="perPage"
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                    <option v-for="option of ADMIN_PER_PAGE_OPTIONS" :value="option">
                        {{ option }}
                    </option>
                </select>
                <span class="ml-3">Found {{ orders.total }} orders</span>
            </div>
            <div>
                <input v-model="search" @keyup="getOrders(null)"
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Search with order no">
            </div>
        </div>

        <table class="table-auto w-full">
            <thead>
                <tr>
                    <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortOrders('id')">
                        ID
                    </TableHeaderCell>
                    <TableHeaderCell :sort-field="sortField" :sort-direction="sortDirection">
                        Customer Name
                    </TableHeaderCell>
                    <TableHeaderCell :sort-field="sortField" :sort-direction="sortDirection">
                        Customer Email
                    </TableHeaderCell>
                    <TableHeaderCell field="status" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortOrders('status')">
                        Status
                    </TableHeaderCell>
                    <TableHeaderCell field="total_price" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortOrders('total_price')">
                        Price
                    </TableHeaderCell>
                    <TableHeaderCell field="created_at" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortOrders('created_at')">
                        Date
                    </TableHeaderCell>
                    <TableHeaderCell field="actions">
                        Actions
                    </TableHeaderCell>
                </tr>
            </thead>
            <!-- Table-Body -->
            <TableBody :orders="orders" />
            <!--/ Table-Body -->
        </table>

        <!-- Pagination -->
        <Pagination :orders="orders" @getForPage="getForPage" />
        <!--/ Pagination -->
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import {
    ADMIN_ORDERS_PER_PAGE,
    ADMIN_ORDERS_SORT_FIELD,
    ADMIN_ORDERS_SORT_DIRECTION,
    ADMIN_PER_PAGE_OPTIONS
} from "../../../../../constants";
import Pagination from './Pagination.vue';
import TableBody from './TableBody.vue';

const store = useStore();
const perPage = ref(ADMIN_ORDERS_PER_PAGE);
const search = ref('');
const orders = computed(() => store.state.orders);
const sortField = ref(ADMIN_ORDERS_SORT_FIELD);
const sortDirection = ref(ADMIN_ORDERS_SORT_DIRECTION);

onMounted(() => getOrders());

const getForPage = (ev, link) => {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }

    getOrders(link.url);
}

const getOrders = (url = null) => {
    store.dispatch("getOrders", {
        url,
        search: search.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
    });
}

const sortOrders = (field) => {
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

    getOrders();
}
</script>

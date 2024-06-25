<template>
    <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
        <!-- TopSide-Table -->
        <div class="flex justify-between border-b-2 pb-3">
            <!-- PerPage-Select-Field -->
            <div class="flex items-center">
                <span class="whitespace-nowrap mr-3">Per Page</span>
                <select @change="getProducts(null)" v-model="perPage"
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm">
                    <option v-for="option of ADMIN_PER_PAGE_OPTIONS" :value="option">
                        {{ option }}
                    </option>
                </select>
                <span class="ml-3">
                    Found {{ products.total }} products
                </span>
            </div>
            <!--/ PerPage-Select-Field -->

            <!-- Search-Field -->
            <div>
                <input v-model="search" @keyup="getProducts(null)"
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Type to Search products">
            </div>
            <!--/ Search-Field -->
        </div>
        <!--/ TopSide-Table -->

        <!-- Table -->
        <table class="table-auto w-full">
            <!-- Table-Head -->
            <thead>
                <tr>
                    <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortProducts('id')">
                        ID
                    </TableHeaderCell>
                    <TableHeaderCell field="image" :sort-field="sortField" :sort-direction="sortDirection">
                        Image
                    </TableHeaderCell>
                    <TableHeaderCell field="title" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortProducts('title')">
                        Title
                    </TableHeaderCell>
                    <TableHeaderCell field="price" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortProducts('price')">
                        Price
                    </TableHeaderCell>
                    <TableHeaderCell field="description">
                        Description
                    </TableHeaderCell>
                    <TableHeaderCell field="published" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortProducts('published')">
                        Published
                    </TableHeaderCell>
                    <TableHeaderCell field="updated_at" :sort-field="sortField" :sort-direction="sortDirection"
                        @click="sortProducts('updated_at')">
                        Last Updated At
                    </TableHeaderCell>
                    <TableHeaderCell field="actions">
                        Actions
                    </TableHeaderCell>
                </tr>
            </thead>
            <!--/ Table-Head -->

            <!-- Table-Body -->
            <TableBody :products="products" @deleteProduct="deleteProduct" @editProduct="editProduct" />
            <!--/ Table-Body -->
        </table>
        <!--/ Table -->

        <!-- Pagination -->
        <Pagination :products="products" @getForPage="getForPage" />
        <!--/ Pagination -->
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import Pagination from './Pagination.vue';
import TableBody from './TableBody.vue';
import { useStore } from 'vuex';
import {
    ADMIN_PRODUCTS_PER_PAGE,
    ADMIN_PRODUCTS_SORT_FIELD,
    ADMIN_PRODUCTS_SORT_DIRECTION,
    ADMIN_PER_PAGE_OPTIONS
} from '../../../../constants';

const store = useStore();

const products = computed(() => store.state.products);
const search = ref('');
const perPage = ref(ADMIN_PRODUCTS_PER_PAGE);
const sortField = ref(ADMIN_PRODUCTS_SORT_FIELD);
const sortDirection = ref(ADMIN_PRODUCTS_SORT_DIRECTION);

const showProductModal = ref(false);

const emit = defineEmits(['clickEdit', 'getForPage', 'deleteProduct', 'editProduct']);

onMounted(() => {
    getProducts();
});

const showAddNewModal = () => {
    showProductModal.value = true
}

/* Paginate-Get-Products */
const getForPage = (ev, link) => {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }

    getProducts(link.url)
}

/* Get-Products */
const getProducts = (url = null) => {
    store.dispatch("getProducts", {
        url,
        search: search.value,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
    });
}

/* Sort-Products */
const sortProducts = (field) => {
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

    getProducts();
}

/* Edit-Product */
const editProduct = (p) => {
    emit('clickEdit', p);
}

/* Delete-Product */
const deleteProduct = (product) => {
    if (!confirm(`Are you sure you want to delete the product?`)) {
        return
    }
    store.dispatch('deleteProduct', product.id)
        .then(res => {
            store.commit('notify', {
                message: 'Item deleted successfully',
                type: 'success'
            });
            store.dispatch('getProducts')
        });
}
</script>
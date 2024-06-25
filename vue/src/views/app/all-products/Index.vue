<template>
    <div class="bg-white">
        <div v-if="products.loading || !products.data.length" class="h-[80vh] flex items-center justify-center">
            <Spinner v-if="products.loading" />
            <p v-else class="text-center py-8 text-gray-700">
                There are no products
            </p>
        </div>
        <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                    All Products
                </h2>
                <select @change="changeSortDirection(null)" v-model="sortDirection"
                    class="appearance-none relative block w-32 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm">
                    <option value="desc">New to Old</option>
                    <option value="asc">Old to New</option>
                </select>
            </div>
            <!-- Products -->
            <Products :products="products" />
            <!--/ Products -->

            <!-- Pagination -->
            <Pagination :products="products" @getForPage="getForPage" class="mt-16" />
            <!--/ Pagination -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Products from './Products.vue';
import Pagination from './Pagination.vue';
import {
    PRODUCTS_PER_PAGE,
    PRODUCTS_SORT_FIELD,
    PRODUCTS_SORT_DIRECTION
} from '../../../constants';

const store = useStore();
const products = computed(() => store.state.products);
const perPage = ref(PRODUCTS_PER_PAGE);
const sortField = ref(PRODUCTS_SORT_FIELD);
const sortDirection = ref(PRODUCTS_SORT_DIRECTION);

const emit = defineEmits(['getForPage']);

onMounted(() => {
    getAppProducts();
});

/* Get-Products */
const getAppProducts = (url = null) => {
    store.dispatch("getAppProducts", {
        url,
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
    });
};

/* Change-Sort-Direction */
const changeSortDirection = () => {
    getAppProducts();
};

/* Paginate-Get-Products */
const getForPage = (ev, link) => {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }

    getAppProducts(link.url)
}
</script>
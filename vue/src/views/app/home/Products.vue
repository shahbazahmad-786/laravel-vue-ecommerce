<template>
    <div class="bg-white">
        <div v-if="products.loading || !products.data.length" class="h-[80vh] flex items-center justify-center">
            <Spinner v-if="products.loading" />
            <p v-else class="text-center py-8 text-gray-700">
                There are no products
            </p>
        </div>
        <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                Customers also purchased
            </h2>
            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div v-for="product, index in products.data" :key="product.id" class="group relative animate-fade-in-down"
                    :style="{ animationDelay: `${index * 0.1}s` }">
                    <router-link :to="{ name: 'app.product-details', params: { slug: product.slug } }"
                        class="block aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <img :src="product.image_url" :alt="product.title"
                            class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                    </router-link>
                    <div class="mt-4 flex justify-between items-start">
                        <div>
                            <h3 class="text-sm text-gray-700 capitalize">
                                {{ product.title }}
                            </h3>
                            <p class="text-sm my-1 font-medium text-gray-900">
                                {{ $filters.currencyUSD(product.price) }}
                            </p>
                            <p class="text-sm text-gray-500">
                                {{ $filters.subStr(product.description, 0, 50) }}
                            </p>
                        </div>
                        <form @submit.prevent="onAddToCart(product.id)">
                            <button type="submit"
                                class="bg-primary-600 text-white p-1 rounded hover:bg-primary-500 active:bg-primary-600">
                                <PlusIcon class="w-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed, onMounted } from 'vue';
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useStore } from 'vuex';
import {
    HOME_PRODUCTS_PER_PAGE,
    HOME_PRODUCTS_SORT_FIELD,
    HOME_PRODUCTS_SORT_DIRECTION
} from '../../../constants';

const perPage = ref(HOME_PRODUCTS_PER_PAGE);
const sortField = ref(HOME_PRODUCTS_SORT_FIELD);
const sortDirection = ref(HOME_PRODUCTS_SORT_DIRECTION);

const store = useStore();
const products = computed(() => store.state.products);

onMounted(() => {
    store.dispatch('getAppProducts', {
        per_page: perPage.value,
        sort_field: sortField.value,
        sort_direction: sortDirection.value
    });
});

const onAddToCart = (productId) => {
    const cart = {
        product_id: productId,
        quantity: 1,
    };

    store.dispatch("addToCart", cart).then(() => {
        store.commit("notify", {
            message: 'Product added into the cart',
            type: 'success',
        });
        store.dispatch('cartCount');
    });
};
</script>
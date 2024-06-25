<template>
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
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useStore } from 'vuex';

const props = defineProps(['products']);
const store = useStore();

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
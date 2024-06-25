<template>
    <div v-if="loading" class="h-[80vh] flex items-center justify-center">
        <Spinner />
    </div>
    <div v-else class="w-[90%] my-16 mx-auto">
        <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div class="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                <img :src="product.image_url" :alt="product.title" class="object-cover object-center" />
            </div>
            <div class="sm:col-span-8 lg:col-span-7">
                <h2 class="text-2xl font-bold text-gray-900 sm:pr-12 capitalize">
                    {{ product.title }}
                </h2>

                <section aria-labelledby="information-heading" class="mt-2">
                    <p class="text-2xl text-gray-900">
                        {{ $filters.currencyUSD(product.price) }}
                    </p>
                    <p class="mt-2">
                        {{ product.description }}
                    </p>
                </section>

                <div class="flex items-center justify-between mt-3">
                    <h4 class="font-semibold">Change Quantity :</h4>
                    <input type="number" v-model="quantity"
                        class="appearance-none relative block w-32 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        min="1">
                </div>

                <form @submit.prevent="onAddToCart(product.id)">
                    <button type="submit"
                        class="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add to bag
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();
const product = ref({});
const loading = ref(true);
const quantity = ref(1);

const getProductDetails = () => {
    store.dispatch('getProductDetails', route.params.slug).then(({ data }) => {
        loading.value = false;
        product.value = data.data[0];
    });
};

watch(route, () => getProductDetails());
onMounted(() => getProductDetails());

const onAddToCart = (productId) => {
    const cart = {
        product_id: productId,
        quantity: quantity.value,
    };

    store.dispatch("addToCart", cart).then(() => {
        store.commit("notify", {
            message: 'Product added into the cart',
            type: 'success',
        });
        router.push({ name: 'app.cart' });
    });
};
</script>
<template>
    <div class="flex-1 mr-10">
        <div class="mt-8">
            <div class="flow-root">
                <ul role="list" class="-my-6 divide-y divide-gray-200">
                    <li v-for="product in cartItems.cartProducts" :key="product.id" class="flex py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <router-link :to="{ name: 'app.product-details', params: { slug: product.slug } }">
                                <img :src="product.image" :alt="product.title"
                                    class="h-full w-full object-cover object-center" />
                            </router-link>
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                            <div>
                                <div class="flex justify-between text-base font-medium text-gray-900">
                                    <h3 class="capitalize">
                                        <router-link :to="{ name: 'app.product-details', params: { slug: product.slug } }">
                                            {{ product.title }}
                                        </router-link>
                                    </h3>
                                    <p class="ml-4">
                                        {{
                                            $filters.currencyUSD(
                                                cartItems.cartQuantities[product.id]['quantity'] *
                                                product.price
                                            )
                                        }}
                                    </p>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{
                                        $filters.subStr(product.description, 0, 100)
                                    }}
                                </p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                                <div class="flex items-center">
                                    <span class="text-gray-500 font-semibold mr-2">Qty :</span>
                                    <input type="number" v-model="cartItems.cartQuantities[product.id]['quantity']"
                                        @change="$emit('updateToCartQty', product.id, cartItems.cartQuantities[product.id]['quantity'])"
                                        class="appearance-none relative block w-32 px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                                        min="1">
                                </div>
                                <div class="flex">
                                    <button @click="$emit('removeToCart', product.id)" type="button"
                                        class="font-medium text-indigo-600 hover:text-indigo-500">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['cartItems']);
</script>
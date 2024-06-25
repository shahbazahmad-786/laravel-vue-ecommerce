<template>
    <div class="flex-1 mr-10">
        <div class="mt-8">
            <div class="flow-root">
                <ul role="list" class="-my-6 divide-y divide-gray-200">
                    <li v-for="order in orderItems" :key="order.id" class="flex py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <router-link :to="{ name: 'app.product-details', params: { slug: order.product.slug } }">
                                <img :src="order.product.image" :alt="order.product.title"
                                    class="h-full w-full object-cover object-center" />
                            </router-link>
                        </div>

                        <div class="ml-4 flex flex-1 flex-col">
                            <div>
                                <div class="text-base font-medium text-gray-900">
                                    <h3 class="capitalize">
                                        <router-link
                                            :to="{ name: 'app.product-details', params: { slug: order.product.slug } }">
                                            {{ order.product.title }}
                                        </router-link>
                                    </h3>
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{
                                        $filters.subStr(order.product.description, 0, 100)
                                    }}
                                </p>
                            </div>
                            <div class="flex flex-1 items-end justify-between text-sm">
                                <div class="flex items-center">
                                    <span class="text-gray-500 font-semibold mr-2">
                                        Qty : {{ order.quantity }}
                                    </span>
                                </div>
                                <div class="flex">
                                    <p class="ml-4 text-base font-medium text-gray-900">
                                        {{ $filters.currencyUSD(order.unit_price) }}
                                    </p>
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
const props = defineProps(['orderItems']);
</script>
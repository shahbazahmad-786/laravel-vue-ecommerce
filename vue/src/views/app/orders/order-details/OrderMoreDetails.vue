<template>
    <div class="w-[25%] mt-5 space-y-3">
        <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Order No :</p>
            <p>
                {{ order.id }}
            </p>
        </div>
        <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Order Date :</p>
            <p>
                {{ order.created_at }}
            </p>
        </div>
        <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Order Status :</p>
            <p class="capitalize">
                {{ order.status }}
            </p>
        </div>
        <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Order SubTotal :</p>
            <p>
                {{ $filters.currencyUSD(order.total_price) }}
            </p>
        </div>
        <div class="mt-6">
            <router-link :to="{ name: 'app.orders' }"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                See More Orders
            </router-link>
        </div>
        <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
                or
                <router-link :to="{ name: 'app.products' }" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['order']);
</script>
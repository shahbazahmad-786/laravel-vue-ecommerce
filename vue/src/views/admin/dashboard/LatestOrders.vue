<template>
    <div class="col-span-1 md:col-span-2 row-span-1 md:row-span-2 bg-white py-6 px-5 rounded-lg shadow">
        <label class="text-lg font-semibold block mb-2">Latest Orders</label>
        <template v-if="!loading">
            <router-link v-for="o of latestOrders" :key="o.id" :to="{ name: 'admin.orders.view', params: { id: o.id } }"
                class="flex justify-between items-center font-semibold py-2 px-3 hover:bg-gray-50">
                <div>
                    <span class="text-primary-700">Order # {{ o.id }}</span>
                    created {{ o.created_at }} • {{ o.items }} items
                </div>
                <div>
                    {{ $filters.currencyUSD(o.total_price) }}
                </div>
            </router-link>
        </template>
        <Spinner v-else text="" class="" />
    </div>
</template>

<script setup>
const props = defineProps(['loading', 'latestOrders']);
</script>
<template>
    <tbody v-if="orders.loading || !orders.data.length">
        <tr>
            <td colspan="7">
                <Spinner v-if="orders.loading" />
                <p v-else class="text-center py-8 text-gray-700">
                    There are no orders
                </p>
            </td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr v-for="(order, index) of orders.data">
            <td class="border-b p-2 ">{{ order.id }}</td>
            <td class="border-b p-2 ">
                {{ order.customer.name }}
            </td>
            <td class="border-b p-2 ">
                {{ order.customer.email }}
            </td>
            <td class="border-b p-2 ">
                <OrderStatus :order="order" />
            </td>
            <td class="border-b p-2">
                {{ $filters.currencyUSD(order.total_price) }}
            </td>
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                {{ order.created_at }}
            </td>
            <td class="border-b p-2 ">
                <router-link :to="{ name: 'admin.orders.view', params: { id: order.id } }" class="w-8 h-8 rounded-full text-indigo-700 border border-indigo-700 flex justify-center items-center
                        hover:text-white hover:bg-indigo-700">
                    <EyeIcon class="w-4 h-4" />
                </router-link>
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import { EyeIcon } from '@heroicons/vue/24/outline';
import OrderStatus from "../../order-status-component/Index.vue";

const props = defineProps(['orders']);
</script>
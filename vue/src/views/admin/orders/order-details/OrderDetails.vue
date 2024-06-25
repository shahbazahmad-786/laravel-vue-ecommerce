<template>
    <div>
        <h2 class="flex justify-between items-center text-xl font-semibold pb-2 border-b border-gray-300">
            Order Details
            <OrderStatus :order="order" />
        </h2>
        <table>
            <tbody>
                <tr>
                    <td class="font-bold py-1 px-2">Order #</td>
                    <td>{{ order.id }}</td>
                </tr>
                <tr>
                    <td class="font-bold py-1 px-2">Order Date</td>
                    <td>{{ order.created_at }}</td>
                </tr>
                <tr>
                    <td class="font-bold py-1 px-2">Order Status</td>
                    <td>
                        <select v-model="order.status" @change="$emit('onStatusChange')"
                            class="appearance-none relative block w-32 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm">
                            <option v-for="status of orderStatuses" :value="status">
                                {{ status }}
                            </option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="font-bold py-1 px-2">SubTotal</td>
                    <td>{{ $filters.currencyUSD(order.total_price) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import OrderStatus from "../order-status-component/Index.vue";

const props = defineProps(['order', 'orderStatuses']);
</script>
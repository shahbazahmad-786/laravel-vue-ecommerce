<template>
    <tbody v-if="orders.loading || !orders.data.length">
        <tr>
            <td colspan="6">
                <Spinner v-if="orders.loading" />
                <p v-else class="text-center py-8 text-gray-700">
                    There are no items
                </p>
            </td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr v-for="order in orders.data">
            <td class="border-b p-2">
                {{ order.id > 9 ? order.id : `0${order.id}` }}
            </td>
            <td class="border-b p-2">
                {{ order.created_at }}
            </td>
            <td :class="{ 'text-green-600': ['paid', 'completed'].includes(order.status), 'text-orange-500': order.status === 'shipped', 'text-red-600': order.status === 'cancel', 'text-gray-400': order.status === 'unpaid' }"
                class="border-b p-2 font-bold capitalize">
                {{ order.status }}
            </td>
            <td class="border-b p-2">
                {{ $filters.currencyUSD(order.total_price) }}
            </td>
            <td class="border-b p-2">
                {{ Object.keys(order.items).length }} Item(s)
            </td>
            <td class="border-b p-2 flex items-center">
                <button @click="payment(order.id)" :disabled="order.status !== 'unpaid'" type="button"
                    :class="order.status === 'unpaid' ? 'bg-primary-600' : 'bg-primary-400'"
                    class="text-white px-2 py-[2px] mr-2 rounded flex items-center">
                    <CreditCardIcon class="w-5 mr-2" /> Pay
                </button>
                <router-link :to="{ name: 'app.orders-details', params: { id: order.id } }"
                    class="text-white bg-primary-600 rounded px-2 py-1">
                    <EyeIcon class="w-5 h-5" />
                </router-link>
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { CreditCardIcon, EyeIcon } from '@heroicons/vue/24/outline';

const store = useStore();
const orders = computed(() => store.state.appOrders);

const getAppOrders = () => store.dispatch("getAppOrders");
onMounted(() => getAppOrders());

const payment = (orderId) => {
    store.dispatch("orderPayment", orderId).then(() => {
        store.commit("notify", {
            message: 'Your Payment is successfully completed.',
            type: 'success',
        });
        getAppOrders();
    });
};
</script>
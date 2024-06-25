<template>
    <div v-if="loading" class="mt-36">
        <Spinner />
    </div>
    <div v-else>
        <!--  Order Details-->
        <OrderDetails :order="order" :orderStatuses="orderStatuses" @onStatusChange="onStatusChange" />
        <!--/  Order Details-->

        <!--  Customer Details-->
        <CustomerDetails :order="order" />
        <!--/  Customer Details-->

        <!--Order Items-->
        <OrderItems :order="order" />
        <!--/ Order Items-->
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import axiosClient from "../../../../axios";
import OrderDetails from './OrderDetails.vue';
import CustomerDetails from './CustomerDetails.vue';
import OrderItems from './OrderItems.vue';

const store = useStore();
const route = useRoute();
const order = ref(null);
// const orderStatuses = ref([]);
const orderStatuses = ref([
    'paid',
    'unpaid',
    'cancel',
    'shipped',
    'completed',
]);
const loading = ref(true);

onMounted(() => {
    store.dispatch('getOrder', route.params.id).then(({ data }) => {
        order.value = data.data;
        loading.value = false;
    });

    // store.dispatch('getOrderStatuses').then(({ data }) => {
    //     orderStatuses.value = data;
    // });

    // axiosClient.get(`/orders/statuses`)
    //     .then(({ data }) => orderStatuses.value = data);
});

const onStatusChange = () => {
    store.dispatch('changeOrderStatus', { orderId: order.value.id, status: order.value.status })
        .then(() => {
            store.commit('notify', {
                'message': 'Order status was successfully changed',
                'type': 'success'
            });
        });
}
</script>

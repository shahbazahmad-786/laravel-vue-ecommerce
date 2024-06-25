<template>
    <div class="sm:px-6 my-6">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Order No : {{ order.id ? order.id : '00' }}
        </h2>
        <div v-if="loading" class="flex items-center justify-center h-[80vh]">
            <Spinner />
        </div>
        <div v-else class="flex min-h-[80vh]">
            <!-- Order-Items -->
            <OrderItems :orderItems="orderItems" />
            <!--/ Order-Items -->

            <!-- Order-More-Details -->
            <OrderMoreDetails :order="order" />
            <!--/ Order-More-Details -->
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import OrderItems from './OrderItems.vue';
import OrderMoreDetails from './OrderMoreDetails.vue';

const store = useStore();
const route = useRoute();
const order = ref({});
const orderItems = ref({});
const loading = ref(true);

onMounted(() => {
    store.dispatch("orderDetails", route.params.id).then(({ data }) => {
        order.value = data.order[0];
        orderItems.value = data.orderItems;
        loading.value = false;
    });
});
</script>
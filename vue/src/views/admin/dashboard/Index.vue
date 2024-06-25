<template>
    <AdminPageLayout heading="Dashboard">
        <div class="flex items-center">
            <label class="mr-2">Change Date Period</label>
            <CustomInput type="select" v-model="chosenDate" @change="onDatePickerChange" :select-options="dateOptions"
                class="w-32" />
        </div>
    </AdminPageLayout>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <!-- Total Users -->
        <Counts heading="Total Users" :loading="loading.usersCount" :count="usersCount" />
        <!--/ Total Users -->

        <!-- Active Products -->
        <Counts heading="Active Products" :loading="loading.productsCount" :count="productsCount" />
        <!--/ Active Products -->

        <!-- Paid Orders -->
        <Counts heading="Paid Orders" :loading="loading.paidOrders" :count="paidOrders" />
        <!--/ Paid Orders -->

        <!-- Total Income -->
        <Counts heading="Total Income" :loading="loading.totalIncome" :count="$filters.currencyUSD(totalIncome)" />
        <!--/ Total Income -->
    </div>

    <div class="grid grid-rows-1 md:grid-rows-2 md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-3">
        <!-- Latest Orders -->
        <LatestOrders :loading="loading.latestOrders" :latestOrders="latestOrders" />
        <!--/ Latest Orders -->

        <!-- Latest Products -->
        <LatestProducts :loading="loading.latestProducts" :latestProducts="latestProducts" />
        <!--/ Latest Products -->

        <!-- Latest Users -->
        <LatestUsers :loading="loading.latestUsers" :latestUsers="latestUsers" />
        <!--/ Latest Users -->
    </div>
</template>

<script setup>
import axiosClient from "../../../axios";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Counts from './Counts.vue';
import LatestOrders from './LatestOrders.vue';
import LatestProducts from './LatestProducts.vue';
import LatestUsers from './LatestUsers.vue';

const store = useStore();
const dateOptions = computed(() => store.state.dateOptions);
const chosenDate = ref('all');

const loading = ref({
    usersCount: true,
    productsCount: true,
    paidOrders: true,
    totalIncome: true,
    latestProducts: true,
    latestUsers: true,
    latestOrders: true
})
const usersCount = ref(0);
const productsCount = ref(0);
const paidOrders = ref(0);
const totalIncome = ref(0);
const latestProducts = ref([]);
const latestUsers = ref([]);
const latestOrders = ref([]);

const updateDashboard = () => {
    const d = chosenDate.value;
    loading.value = {
        usersCount: true,
        productsCount: true,
        paidOrders: true,
        totalIncome: true,
        latestProducts: true,
        latestUsers: true,
        latestOrders: true
    }
    axiosClient.get(`/dashboard/users-count`, { params: { d } }).then(({ data }) => {
        usersCount.value = data
        loading.value.usersCount = false;
    });
    axiosClient.get(`/dashboard/products-count`, { params: { d } }).then(({ data }) => {
        productsCount.value = data;
        loading.value.productsCount = false;
    });
    axiosClient.get(`/dashboard/orders-count`, { params: { d } }).then(({ data }) => {
        paidOrders.value = data;
        loading.value.paidOrders = false;
    });
    axiosClient.get(`/dashboard/income-amount`, { params: { d } }).then(({ data }) => {
        totalIncome.value = data;
        loading.value.totalIncome = false;
    });
    axiosClient.get(`/dashboard/latest-orders`, { params: { d } }).then(({ data: orders }) => {
        latestOrders.value = orders.data;
        loading.value.latestOrders = false;
    });
    axiosClient.get(`/dashboard/latest-products`, { params: { d } }).then(({ data: products }) => {
        latestProducts.value = products;
        loading.value.latestProducts = false;
    })
    axiosClient.get(`/dashboard/latest-users`, { params: { d } }).then(({ data: users }) => {
        latestUsers.value = users;
        loading.value.latestUsers = false;
    });
}

onMounted(() => updateDashboard());
const onDatePickerChange = () => updateDashboard();
</script>

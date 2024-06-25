<template>
    <AdminPageLayout heading="Products">
        <button type="button" @click="showAddNewModal()"
            class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Add new Product
        </button>
    </AdminPageLayout>

    <!-- ProductsTable-Component -->
    <ProductsTable @clickEdit="editProduct" />
    <!--/ ProductsTable-Component -->

    <!-- Product-Modal -->
    <ProductModal v-model="showProductModal" :product="productModel" @close="onModalClose" />
    <!--/ Product-Modal -->
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductModal from './ProductModal.vue';
import ProductsTable from './products-table/Index.vue';
import store from '../../../store';

const DEFAULT_PRODUCT = {
    id: '',
    title: '',
    description: '',
    image: '',
    image_url: '',
    price: ''
}

/* Get All Products */
const products = computed(() => store.state.products);

const productModel = ref({ ...DEFAULT_PRODUCT });
const showProductModal = ref(false);

/* Show Modal */
const showAddNewModal = () => showProductModal.value = true;

/* Edit Product */
const editProduct = (p) => {
    store.dispatch("getProduct", p.id).then(({ data }) => {
        productModel.value = data;
        showAddNewModal();
    });
};

/* On Modal Close */
const onModalClose = () => {
    productModel.value = { ...DEFAULT_PRODUCT };
};
</script>
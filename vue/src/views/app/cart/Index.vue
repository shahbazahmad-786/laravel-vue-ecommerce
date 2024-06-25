<template>
    <div class="sm:px-6 my-6">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Shopping Cart
        </h2>
        <div v-if="cartItems.loading || !cartItems.cartProducts.length" class="flex items-center justify-center h-[80vh]">
            <Spinner v-if="cartItems.loading" />
            <p v-else-if="!cartItems.cartProducts.length" class="text-md text-gray-500 text-center">
                The cart is empty
            </p>
        </div>
        <div v-else class="flex min-h-[80vh]">
            <!-- Cart-Products -->
            <CartProducts :cartItems="cartItems" @removeToCart="removeToCart" @updateToCartQty="updateToCartQty" />
            <!--/ Cart-Products -->

            <!-- SubTotal -->
            <SubTotal :cartItems="cartItems" @checkout="checkout" />
            <!--/ SubTotal -->
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import CartProducts from './CartProducts.vue';
import SubTotal from './SubTotal.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const cartItems = computed(() => store.state.cartItems);

const getCartItems = () => store.dispatch("getCartItems");
const cartCount = () => store.dispatch('cartCount');

onMounted(() => getCartItems());

/* Update-Cart-Qty */
const updateToCartQty = (productId, qty) => {
    const cart = {
        product_id: productId,
        quantity: qty,
    };

    store.dispatch("updateToCart", cart).then(() => {
        store.commit("notify", {
            message: 'Product quantity will be changed',
            type: 'success',
        });
        getCartItems();
    });
};

/* Remove-Item-to-Cart */
const removeToCart = (id) => {
    if (!confirm('Are you sure you want to remove this item from cart?')) {
        return;
    }
    store.dispatch("removeToCart", id).then(() => {
        store.commit("notify", {
            message: 'Product remove from this cart',
            type: 'success',
        });
        getCartItems();
        cartCount();
    });
};

/* Checkout-Method */
const checkout = () => {
    store.dispatch("checkout").then(() => {
        store.commit("notify", {
            message: 'Checkout successfully completed.',
            type: 'success',
        });
        router.push({ name: 'app.orders' });
        cartCount();
    });
};
</script>
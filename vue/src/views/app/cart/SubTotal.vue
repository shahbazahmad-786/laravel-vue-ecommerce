<template>
    <div class="w-[25%] mt-5">
        <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>
                {{ $filters.currencyUSD(cartItems.total) }}
            </p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
        </p>
        <div class="mt-6">
            <button type="button" @click="$emit('checkout')"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Checkout
            </button>
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
const props = defineProps(['cartItems']);
</script>
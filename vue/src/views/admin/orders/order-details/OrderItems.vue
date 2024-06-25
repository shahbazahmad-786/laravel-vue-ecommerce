<template>
    <div>
        <h2 class="text-xl font-semibold my-6 pb-2 border-b border-gray-300">
            Order Items
        </h2>
        <div v-for="item of order.items">
            <!-- Order Item -->
            <div class="flex flex-col sm:flex-row items-center  gap-4">
                <div class="w-24 h-20 flex items-center justify-center overflow-hidden">
                    <img :src="item.product.image" class="object-cover" />
                </div>
                <div class="flex flex-col justify-between flex-1">
                    <div class="flex justify-between mb-3 capitalize">
                        <h3>
                            {{ item.product.title }}
                        </h3>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            Qty: {{ item.quantity }}
                        </div>
                        <span class="text-lg font-semibold">
                            {{ $filters.currencyUSD(item.unit_price) }}
                        </span>
                    </div>
                </div>
            </div>
            <!--/ Order Item -->
            <hr class="my-3" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['order']);
</script>
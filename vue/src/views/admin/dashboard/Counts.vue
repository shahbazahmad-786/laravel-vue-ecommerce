<template>
    <div class="animate-fade-in-down bg-white py-6 px-5 rounded-lg shadow flex flex-col items-center justify-center">
        <label class="text-lg font-semibold block mb-2">{{ heading }}</label>
        <template v-if="!loading">
            <span class="text-3xl font-semibold">{{ count }}</span>
        </template>
        <Spinner v-else text="" class="" />
    </div>
</template>

<script setup>
const props = defineProps(['heading', 'loading', 'count']);
</script>
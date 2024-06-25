<template>
    <div class="mb-2 flex items-center justify-between">
        <h1 class="text-3xl font-semibold">
            {{ heading }}
        </h1>
        <slot />
    </div>
</template>

<script setup>
const props = defineProps(['heading']);
</script>
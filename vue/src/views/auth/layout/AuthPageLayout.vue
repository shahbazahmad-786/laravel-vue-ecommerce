<template>
    <div>
        <!-- Title/Heading -->
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {{ title }}
        </h2>
        <!--/ Title/Heading -->
    </div>

    <!-- Form/Content -->
    <slot />
    <!--/ Form/Content -->
</template>

<script setup>
const { title } = defineProps({
    title: String
});
</script>

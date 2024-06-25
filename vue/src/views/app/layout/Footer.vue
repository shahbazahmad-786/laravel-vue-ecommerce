<template>
    <div class="text-center border-t py-2 text-gray-500">
        Copyright © {{ date }} All rights reserved by
        <router-link :to="{ name: 'app.home' }" class="text-primary-700 hover:underline">
            <AppName />
        </router-link>
    </div>
</template>

<script setup>
const date = new Date().getFullYear();
</script>
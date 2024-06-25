<template>
    <img :src="appLogo" :alt="appName">
</template>

<script setup>
import { computed } from 'vue';
import store from '../../store';

const appLogo = computed(() => store.state.app.appLogo);
const appName = computed(() => store.state.app.appName);
</script>
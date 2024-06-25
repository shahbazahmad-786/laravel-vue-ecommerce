<template>
    {{ appName }}
</template>

<script setup>
import { computed } from 'vue';
import store from '../../store';
const appName = computed(() => store.state.app.appName);
</script>
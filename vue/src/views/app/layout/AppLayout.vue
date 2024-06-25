<template>
    <template v-if="loading">
        <Spinner class="mt-[45vh]" />
    </template>
    <template v-else>
        <div class="bg-white">
            <Header />
        </div>
        <router-view />
        <Footer />
    </template>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import store from '../../../store';

const loading = ref(true);

onMounted(() => store.dispatch('getNormalUser').then(() => loading.value = false));
</script>
<!-- ### Import this Component at App.vue Component ### -->
<template>
    <div v-if="notification.show"
        class="text-white bg-black fixed left-[35%] right-[35%] bottom-[15px] py-1 px-3 rounded flex items-center justify-start">
        <CheckCircleIcon v-if="notification.type === 'success'" class="w-5 mr-1" />
        <XCircleIcon v-if="notification.type === 'danger'" class="w-5 mr-1" />
        <InformationCircleIcon v-if="notification.type === 'info'" class="w-5 mr-1" />
        <ExclamationTriangleIcon v-if="notification.type === 'warning'" class="w-5 mr-1" />
        {{ notification.message }}
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from 'vuex';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const store = useStore();

const notification = computed(() => store.state.notification);
</script>

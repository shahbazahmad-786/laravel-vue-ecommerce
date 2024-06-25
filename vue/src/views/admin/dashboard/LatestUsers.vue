<template>
    <div class="bg-white py-6 px-5 rounded-lg shadow">
        <label class="text-lg font-semibold block mb-2">Latest Users</label>
        <template v-if="!loading">
            <div v-for="u of latestUsers" :key="u.id" class="mb-3 flex">
                <div class="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full mr-2">
                    <UserIcon class="w-5" />
                </div>
                <div>
                    <h3 class="font-semibold capitalize">{{ u.name }}</h3>
                    <p>{{ u.email }}</p>
                </div>
            </div>
        </template>
        <Spinner v-else text="" class="" />
    </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['loading', 'latestUsers']);
</script>
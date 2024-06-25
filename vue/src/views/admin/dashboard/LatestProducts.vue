<template>
    <div class="bg-white py-6 px-5 rounded-lg shadow">
        <label class="text-lg font-semibold block mb-2">Latest Products</label>
        <template v-if="!loading">
            <div v-for="p of latestProducts" :key="p.id" class="mb-3 flex">
                <div class="mr-2">
                    <img class="w-12 h-12 object-cover rounded-full bg-gray-200" :src="p.image || DEFAULT_EMPTY_IMAGE">
                </div>
                <div>
                    <h3 class="font-semibold capitalize">
                        {{ p.title }}
                    </h3>
                    <p>
                        Created By {{ p.user.name }}
                    </p>
                </div>
            </div>
        </template>
        <Spinner v-else text="" class="" />
    </div>
</template>

<script setup>
import { DEFAULT_EMPTY_IMAGE } from '../../../constants';

const props = defineProps(['loading', 'latestProducts']);
</script>
<template>
    <div v-if="!orders.loading" class="flex justify-between items-center mt-5">
        <div v-if="orders.data.length">
            Showing from {{ orders.from }} to {{ orders.to }}
        </div>
        <nav v-if="orders.total > orders.limit"
            class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a v-for="(link, i) of orders.links" :key="i" :disabled="!link.url" href="#"
                @click="$emit('getForPage', $event, link)" aria-current="page"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap" :class="[
                    link.active
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    i === 0 ? 'rounded-l-md' : '',
                    i === orders.links.length - 1 ? 'rounded-r-md' : '',
                    !link.url ? ' bg-gray-100 text-gray-700' : ''
                ]" v-html="link.label">
            </a>
        </nav>
    </div>
</template>

<script setup>
const props = defineProps(['orders']);
</script>
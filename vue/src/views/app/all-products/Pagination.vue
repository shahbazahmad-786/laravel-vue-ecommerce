<template>
    <div v-if="!products.loading" class="flex justify-between items-center mt-5">
        <div v-if="products.data.length">
            Showing from {{ products.from }} to {{ products.to }}
        </div>
        <nav v-if="products.total > products.limit"
            class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a v-for="(link, i) of products.links" :key="i" :disabled="!link.url" href="#"
                @click="$emit('getForPage', $event, link)" aria-current="page"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap" :class="[
                    link.active
                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    i === 0 ? 'rounded-l-md' : '',
                    i === products.links.length - 1 ? 'rounded-r-md' : '',
                    !link.url ? ' bg-gray-100 text-gray-700' : ''
                ]" v-html="link.label">
            </a>
        </nav>
    </div>
</template>

<script setup>
const props = defineProps(['products']);
</script>
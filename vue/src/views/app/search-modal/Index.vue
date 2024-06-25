<template>
    <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                            <div class="flex items-center border-b">
                                <MagnifyingGlassIcon class="w-6" />
                                <input @keyup="searchProducts(null)" v-model="search" type="text"
                                    placeholder="Search products" class="w-full border-none focus:ring-0">
                                <XMarkIcon class="w-6 cursor-pointer hover:text-gray-500"
                                    @click="emit('searchModalEvent')" />
                            </div>
                            <div v-if="products.loading || !search || !products.data.length"
                                class="flex items-center justify-center h-44">
                                <Spinner v-if="products.loading" />
                                <p v-else-if="!search" class="text-md text-gray-500 text-center">
                                    No searches
                                </p>
                                <p v-else-if="!products.data.length" class="text-md text-gray-500 text-center">
                                    There are no products
                                </p>
                            </div>
                            <div v-else class="h-60 overflow-y-auto" id="search-modal-scroll">
                                <router-link :to="{ name: 'app.product-details', params: { slug: product.slug } }"
                                    v-for="product in  products.data" :key="product.id" @click="emit('searchModalEvent')"
                                    class="flex justify-between items-center bg-gray-50 mt-2 rounded-md p-2 hover:bg-gray-100">
                                    <div class="capitalize font-semibold">
                                        {{ product.title }}
                                    </div>
                                    <div class="w-10">
                                        <img :src="product.image_url" :alt="product.title" class="w-full">
                                    </div>
                                </router-link>
                            </div>

                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
} from '@headlessui/vue';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';

const store = useStore();
const search = ref('');
const products = computed(() => store.state.searchProducts);
const emit = defineEmits(['searchModalEvent']);

const searchProducts = () => {
    store.dispatch("searchAppProducts", {
        search: search.value
    });
};
</script>

<style scoped>
#search-modal-scroll::-webkit-scrollbar {
    background-color: rgb(198, 198, 198);
    width: 5px;
    border-radius: 20px;
}

#search-modal-scroll::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 20px;
}
</style>

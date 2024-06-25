<template>
    <tbody v-if="products.loading || !products.data.length">
        <tr>
            <td colspan="8">
                <Spinner v-if="products.loading" />
                <p v-else class="text-center py-8 text-gray-700">
                    There are no products
                </p>
            </td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr v-for="(product, index) of products.data">
            <td class="border-b p-2 ">{{ product.id }}</td>
            <td class="border-b p-2">
                <img class="w-16 h-16 object-cover rounded-full bg-gray-200" :src="product.image_url || DEFAULT_EMPTY_IMAGE"
                    :alt="product.title">
            </td>
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                {{ product.title }}
            </td>
            <td class="border-b p-2">
                {{ $filters.currencyUSD(product.price) }}
            </td>
            <td class="border-b p-2">
                {{
                    product.description ?
                    $filters.subStr(product.description, 0, 15) :
                    'Empty'
                }}
            </td>
            <td class="border-b p-2 ">
                <CustomCheckbox :checked="product.published" @change="updatePublished(product)" />
            </td>
            <td class="border-b p-2 ">
                {{ product.updated_at }}
            </td>
            <!-- Actions-Td -->
            <td class="border-b p-2">
                <Menu as="div" class="relative inline-block text-left">
                    <div>
                        <MenuButton
                            class="inline-flex items-center justify-center rounded-full w-10 h-10 bg-black bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <EllipsisVerticalIcon class="h-5 w-5 text-primary-500" aria-hidden="true" />
                        </MenuButton>
                    </div>

                    <transition enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                        <MenuItems
                            class="absolute z-10 right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="px-1 py-1">
                                <MenuItem v-slot="{ active }">
                                <button :class="[
                                    active ? 'bg-primary-600 text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]" @click="$emit('editProduct', product)">
                                    <PencilIcon :active="active" class="mr-2 h-5 w-5 text-primary-400" aria-hidden="true" />
                                    Edit
                                </button>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <button :class="[
                                    active ? 'bg-primary-600 text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]" @click="$emit('deleteProduct', product)">
                                    <TrashIcon :active="active" class="mr-2 h-5 w-5 text-primary-400" aria-hidden="true" />
                                    Delete
                                </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </td>
            <!--/ Actions-Td -->
        </tr>
    </tbody>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { DEFAULT_EMPTY_IMAGE } from '../../../../constants';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps(['products']);

/* Update Published Column */
const updatePublished = (product) => {
    if (product.published === 1) {
        product.published = 0;
    } else {
        product.published = 1;
    }
    store.dispatch('updateProduct', product)
        .then(response => {
            if (response.status === 200) {
                store.commit('notify', {
                    message: `"${product.title}" product will be updated`,
                    type: 'success'
                });
            }
        })
}
</script>
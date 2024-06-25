<template>
    <tbody v-if="users.loading || !users.data.length">
        <tr>
            <td colspan="6">
                <Spinner v-if="users.loading" />
                <p v-else class="text-center py-8 text-gray-700">
                    There are no users
                </p>
            </td>
        </tr>
    </tbody>
    <tbody v-else>
        <tr v-for="(user, index) of users.data">
            <td class="border-b p-2 ">{{ user.id }}</td>
            <td class="border-b p-2 ">
                {{ user.name }}
            </td>
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                {{ user.email }}
            </td>
            <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                {{ user.is_admin === 1 ? 'Admin' : 'Normal User' }}
            </td>
            <td class="border-b p-2">
                {{ user.created_at }}
            </td>
            <td class="border-b p-2 ">
                <Menu as="div" class="relative inline-block text-left">
                    <div>
                        <MenuButton
                            class="inline-flex items-center justify-center rounded-full w-10 h-10 bg-black bg-opacity-0 text-sm font-medium text-white hover:bg-opacity-5 focus:bg-opacity-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <EllipsisVerticalIcon class="h-5 w-5 text-indigo-500" aria-hidden="true" />
                        </MenuButton>
                    </div>

                    <transition enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                        <MenuItems
                            class="absolute z-10 right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div class="px-1 py-1">
                                <MenuItem v-slot="{ active }">
                                <button :class="[
                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]" @click="$emit('changeUserRole', user)">
                                    <PencilIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true" />
                                    Change Role
                                </button>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <button :class="[
                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]" @click="$emit('deleteUser', user)">
                                    <TrashIcon :active="active" class="mr-2 h-5 w-5 text-indigo-400" aria-hidden="true" />
                                    Delete User
                                </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps(['users']);
</script>
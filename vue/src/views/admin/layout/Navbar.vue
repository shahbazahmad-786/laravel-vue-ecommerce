<template>
    <header class="flex justify-between items-center p-3 h-14 shadow bg-white">
        <!-- Toggle-Sidebar-Btn -->
        <button @click="emit('toggle-sidebar')"
            class="flex items-center justify-center rounded transition-colors w-8 h-8 text-gray-700 hover:bg-black/10">
            <Bars3Icon class="w-6" />
        </button>
        <!--/ Toggle-Sidebar-Btn -->

        <!-- Menubar -->
        <Menu as="div" class="relative inline-block text-left">
            <!-- Menu-Btn -->
            <MenuButton class="flex items-center">
                <UserCircleIcon class="rounded-full w-7 mr-2" />
                <small>{{ adminUser.name }}</small>
                <ChevronDownIcon class="h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
            </MenuButton>
            <!--/ Menu-Btn -->

            <!-- Menu-List -->
            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <!-- Menu-Items -->
                <MenuItems
                    class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-1 py-1">
                        <!-- Logout-Menu -->
                        <MenuItem v-slot="{ active }">
                        <button @click="showLogoutModal = true"
                            :class="[active ? 'bg-primary-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                            <PowerIcon :active="active" class="mr-2 h-5 w-5 text-primary-400" aria-hidden="true" />
                            Logout
                        </button>
                        </MenuItem>
                        <!--/ Logout-Menu -->
                    </div>
                </MenuItems>
                <!--/ Menu-Items -->
            </transition>
            <!--/ Menu-List -->
        </Menu>
        <!--/ Menubar -->
    </header>

    <!-- Admin-Logout-Modal -->
    <AdminLogout v-if="showLogoutModal" @closeLogoutModal="showLogoutModal = false" />
    <!--/ Admin-Logout-Modal -->
</template>

<script setup>
import { Bars3Icon, PowerIcon, UserCircleIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { computed, ref } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const showLogoutModal = ref(false);

const emit = defineEmits(['toggle-sidebar', 'closeLogoutModal'])

/* Get Admin-User Data */
const adminUser = computed(() => store.state.user.data);
</script>

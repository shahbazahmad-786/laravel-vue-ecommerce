<template>
    <!-- For Small-Devices -->
    <TransitionRoot as="template" :show="sideBar">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="sideBar = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full" enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                    leave-to="-translate-x-full">
                    <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                        <div class="flex px-4 pb-2 pt-5">
                            <button type="button"
                                class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                @click="sideBar = false">
                                <span class="absolute -inset-0.5" />
                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <!-- Links -->

                        <!-- Navigation -->
                        <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div v-for="page in navigation" :key="page.name" class="flow-root">
                                <router-link :to="{ name: page.to }" class="-m-2 block p-2 font-medium text-gray-900">
                                    {{ page.name }}
                                </router-link>
                            </div>
                        </div>
                        <!--/ Navigation -->

                        <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                            <div class="flow-root">
                                <router-link :to="{ name: 'app.orders' }" class="-m-2 block p-2 font-medium text-gray-900">
                                    Orders
                                </router-link>
                            </div>
                            <div class="flow-root">
                                <button @click="showLogoutModal = true" class="-m-2 block p-2 font-medium text-gray-900">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
    <!--/ For Small-Devices -->

    <header class="relative bg-white">
        <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="border-b border-gray-200">
                <div class="flex h-14 items-center">
                    <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                        @click="sideBar = true">
                        <span class="absolute -inset-0.5" />
                        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Logo -->
                    <div class="ml-4 flex lg:ml-0">
                        <router-link :to="{ name: 'app.home' }">
                            <AppLogo class="h-8 w-auto" />
                        </router-link>
                    </div>
                    <!--/ Logo -->

                    <!-- Navigation -->
                    <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
                        <div id="app-header" class="flex h-full space-x-8">
                            <router-link v-for="page in navigation" :key="page.name" :to="{ name: page.to }"
                                class="flex px-2 items-center text-sm font-medium text-gray-700 hover:text-primary-600 border-transparent border-b-2 hover:border-primary-600 transition-colors duration-200">
                                {{ page.name }}
                            </router-link>
                        </div>
                    </PopoverGroup>
                    <!--/ Navigation -->

                    <div class="ml-auto flex items-center">
                        <!-- Auth-Routes -->
                        <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            <Menu as="div" class="relative inline-block text-left">
                                <!-- Menu-Btn -->
                                <MenuButton class="flex items-center">
                                    <UserCircleIcon class="rounded-full w-7 mr-2" />
                                    <small v-if="normalUser.id">{{ normalUser.name }}</small>
                                    <ChevronDownIcon class="h-5 w-5 text-violet-200 hover:text-violet-100"
                                        aria-hidden="true" />
                                </MenuButton>
                                <!--/ Menu-Btn -->

                                <!-- Menu-List -->
                                <transition enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0">
                                    <!-- Menu-Items -->
                                    <MenuItems
                                        class="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div class="px-1 py-1">
                                            <!-- Orders-Menu -->
                                            <MenuItem v-slot="{ active }">
                                            <router-link :to="{ name: 'app.orders' }"
                                                :class="[active ? 'bg-primary-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                                                <Squares2X2Icon :active="active" class="mr-2 h-5 w-5 text-primary-400"
                                                    aria-hidden="true" />
                                                Orders
                                            </router-link>
                                            </MenuItem>
                                            <!--/ Orders-Menu -->

                                            <!-- Logout-Menu -->
                                            <MenuItem v-slot="{ active }">
                                            <button @click="showLogoutModal = true"
                                                :class="[active ? 'bg-primary-600 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-sm',]">
                                                <PowerIcon :active="active" class="mr-2 h-5 w-5 text-primary-400"
                                                    aria-hidden="true" />
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
                        </div>
                        <!--/ Auth-Routes -->

                        <!-- Search-Field -->
                        <div class="flex lg:ml-6">
                            <button type="button" @click="searchModal = true" class="p-2 text-gray-400 hover:text-gray-500">
                                <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <!--/ Search-Field -->


                        <!-- Cart -->
                        <div class="ml-4 flow-root lg:ml-6">
                            <router-link :to="{ name: 'app.cart' }" class="group -m-2 flex items-center p-2">
                                <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true" />
                                <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                    {{ cartCount.loading ? 0 : cartCount.count }}
                                </span>
                            </router-link>
                        </div>
                        <!--/ Cart -->
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <!-- Search-Modal -->
    <SearchModal v-if="searchModal" @searchModalEvent="searchModal = false" />
    <!--/ Search-Modal -->

    <!-- Logout-Modal -->
    <Logout v-if="showLogoutModal" @closeLogoutModal="showLogoutModal = false" />
    <!--/ Logout-Modal -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingBagIcon,
    XMarkIcon,
    PowerIcon,
    UserCircleIcon,
    Squares2X2Icon
} from '@heroicons/vue/24/outline';
import SearchModal from '../search-modal/Index.vue';
import { useStore } from 'vuex';

const navigation = [
    { name: 'Home', to: 'app.home' },
    { name: 'Products', to: 'app.products' },
    { name: 'About Us', to: 'app.about-us' },
];

const store = useStore();
const sideBar = ref(false);
const searchModal = ref(false);
const showLogoutModal = ref(false);
const normalUser = computed(() => store.state.user.data);
const cartCount = computed(() => store.state.cartCount);

onMounted(() => {
    store.dispatch('getNormalUser').then(() => loading.value = false);
    store.dispatch('cartCount');
});
</script>
<template>
    <div id="admin-header"
        class="min-w-[160px] w-[160px] min-h-[100vh]  transition-all bg-primary-700 text-white py-4 px-2">
        <router-link v-for="(link, index) in links" :key="index" :to="{ name: link.name }"
            class="flex items-center p-2 rounded transition-colors hover:bg-black/30">
            <!-- Route-Icon -->
            <span class="mr-2 text-gray-300">
                <HomeIcon v-if="link.heading === 'Dashboard'" class="w-5" />
                <Squares2X2Icon v-else-if="link.heading === 'Products'" class="w-5" />
                <Bars4Icon v-else-if="link.heading === 'Orders'" class="w-5" />
                <UsersIcon v-else-if="link.heading === 'Users'" class="w-5" />
            </span>
            <!--/ Route-Icon -->

            <!-- Route-Heading -->
            <span class="text-xs">
                {{ link.heading }}
            </span>
            <!--/ Route-Heading -->
        </router-link>
    </div>
</template>

<script setup>
import {
    HomeIcon,
    Squares2X2Icon,
    Bars4Icon,
    UsersIcon
} from '@heroicons/vue/24/outline';

/* Router-Links */
const links = [
    { name: 'admin.dashboard', heading: 'Dashboard' },
    { name: 'admin.products', heading: 'Products' },
    { name: 'admin.orders', heading: 'Orders' },
    { name: 'admin.users', heading: 'Users' },
];
</script>

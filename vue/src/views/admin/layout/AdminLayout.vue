<template>
    <!-- Main-Layout -->
    <div v-if="adminUser.id" class="min-h-full bg-gray-200 flex">
        <!-- Sidebar -->
        <Sidebar :class="{ '-ml-[160px]': !sidebarOpened }" />
        <!--/ Sidebar -->

        <div class="flex-1">
            <!-- Navbar -->
            <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
            <!--/ Navbar -->

            <!-- Content -->
            <main class="p-6">
                <router-view />
            </main>
            <!-- Content -->
        </div>
    </div>
    <!--/ Main-Layout -->

    <!-- Loading-Spinner -->
    <div v-else class="min-h-screen bg-gray-200 flex items-center justify-center">
        <Spinner />
    </div>
    <!--/ Loading-Spinner -->

    <!-- <Toast /> -->
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import store from "../../../store";

// const { title } = defineProps({
//     title: String
// })
const sidebarOpened = ref(true);

/* Get Current-User data */
const adminUser = computed(() => store.state.user.data);

const toggleSidebar = () => {
    sidebarOpened.value = !sidebarOpened.value
}

/* Responsive Sidebar (in small devices) */
const updateSidebarState = () => {
    sidebarOpened.value = window.outerWidth > 768;
}

onMounted(() => {
    /* Call to get Current-User data */
    store.dispatch('getAdminUser');
    // store.dispatch('getCountries')
    updateSidebarState();
    window.addEventListener('resize', updateSidebarState)
});

onUnmounted(() => {
    window.removeEventListener('resize', updateSidebarState)
});

</script>

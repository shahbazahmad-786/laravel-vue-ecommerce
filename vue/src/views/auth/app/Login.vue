<template>
    <AuthPageLayout title="Sign in to your account">
        <!-- Form -->
        <form class="mt-8 space-y-6" method="POST" @submit.prevent="login">
            <!-- Error-Msg -->
            <div v-if="errorMsg" class="flex items-center justify-between py-3 px-5 bg-red-500 text-white rounded">
                {{ errorMsg }}
                <span @click="errorMsg = ''"
                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </div>
            <!--/ Error-Msg -->

            <input type="hidden" name="remember" value="true" />
            <div class="rounded-md shadow-sm -space-y-px">
                <!-- Email-Field -->
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autocomplete="email" required=""
                        v-model="user.email"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        placeholder="Email address" />
                </div>
                <!--/ Email-Field -->

                <!-- Password-Field -->
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input id="password" name="password" type="password" autocomplete="current-password" required=""
                        v-model="user.password"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                        placeholder="Password" />
                </div>
                <!--/ Password-Field -->
            </div>

            <div class="flex items-center justify-between">
                <!-- RememberMe-Field -->
                <div class="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" v-model="user.remember"
                        class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
                </div>
                <!--/ RememberMe-Field -->

                <!-- Register-Route -->
                <div class="text-sm">
                    <router-link :to="{ name: 'register' }" class="font-medium text-primary-600 hover:text-primary-500">
                        No have an account?
                    </router-link>
                </div>
                <!--/ Register-Route -->
            </div>

            <!-- Submit-Btn -->
            <div>
                <button type="submit" :disabled="loading"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    :class="{
                        'cursor-not-allowed': loading,
                        'hover:bg-primary-500': loading,
                    }">
                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon class="h-5 w-5 text-primary-500 group-hover:text-primary-400" aria-hidden="true" />
                    </span>
                    Sign in
                </button>
            </div>
            <!--/ Submit-Btn -->
        </form>
        <!--/ Form -->
    </AuthPageLayout>
</template>

<script setup>
import { ref } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/24/solid';
import store from "../../../store";
import router from "../../../router";

let loading = ref(false);
let errorMsg = ref("");

/* Form Models */
const user = {
    email: '',
    password: '',
    remember: false
}

/* Login Method */
const login = () => {
    loading.value = true;
    store.dispatch('login', user)
        .then(() => {
            store.commit("notify", {
                message: `You, Successfully Logged In.`,
                type: "success",
            });
            loading.value = false;
            router.push({ name: 'app.home' });
        })
        .catch(({ response }) => {
            loading.value = false;
            errorMsg.value = response.data.message;
        })
};
</script>

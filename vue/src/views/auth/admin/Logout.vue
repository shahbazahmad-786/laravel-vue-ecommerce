<template>
    <TransitionRoot as="template" :show="true">
        <Dialog as="div" class="relative z-10">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
            </TransitionChild>

            <div class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative flex justify-center bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-[450px] sm:w-full">
                            <div class="bg-white px-4 pt-5 pb-4">
                                <QuestionMarkCircleIcon class="w-16 mx-auto text-primary-700" />
                                <h2 class="text-center text-xl mt-2">
                                    Are you sure you want to logout this site?
                                </h2>

                                <div class="flex justify-center items-center mt-4">
                                    <button type="button" @click="logout"
                                        class="w-full flex text-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm bg-primary-600 hover:bg-primary-600 focus:ring-primary-500">
                                        Logout
                                    </button>
                                    <button type="button" @click="$emit('closeLogoutModal')"
                                        class="w-full text-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

/* Logout Method */
const logout = () => {
    store.dispatch('adminLogout')
        .then(() => {
            store.commit("notify", {
                message: `You, Successfully Logged Out.`,
                type: "success",
            });
            router.push({ name: 'adminLogin' });
        })
}
</script>

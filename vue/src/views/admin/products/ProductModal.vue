<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot as="template" :show="show">
        <Dialog as="div" class="relative z-10" @close="show = false">
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
                            class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-[700px] sm:w-full">

                            <!-- Spinner-Loader -->
                            <Spinner v-if="loading"
                                class="absolute left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center" />
                            <!--/ Spinner-Loader -->

                            <!-- Modal-Header -->
                            <header class="py-3 px-4 flex justify-between items-center">
                                <!-- Modal-Title -->
                                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900">
                                    {{ product.id ? `Update product: "${props.product.title}"` : 'Create new Product' }}
                                </DialogTitle>
                                <!--/ Modal-Title -->

                                <!-- Close-Modal -->
                                <button @click="closeModal()"
                                    class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <!--/ Close-Modal -->
                            </header>
                            <!--/ Modal-Header -->

                            <!-- Form -->
                            <form @submit.prevent="onSubmit">
                                <!-- Form-Fields -->
                                <div class="bg-white px-4 pt-5 pb-4 space-y-2">
                                    <!-- Image-Field -->
                                    <input type="file" @change="onImageChoose" id="image" class="hidden">
                                    <div class="flex items-center flex-col">
                                        <img :src="product.image_url || DEFAULT_EMPTY_IMAGE"
                                            class="w-28 h-28 rounded-full border object-cover aspect-square">
                                        <label for="image"
                                            class="bg-gray-100 mt-2 py-1 px-3 text-center rounded-md border cursor-pointer hover:bg-gray-200 active:bg-gray-100 transition-colors text-sm">
                                            Choose Image
                                        </label>
                                    </div>
                                    <!--/ Image-Field -->

                                    <CustomInput v-model="product.title" label="Product Title" :required="true" />
                                    <CustomInput type="textarea" v-model="product.description" label="Description" />
                                    <CustomInput type="number" v-model="product.price" label="Price" prepend="$"
                                        :required="true" />
                                    <CustomInput type="checkbox" v-model="product.published" label="Published" />
                                </div>
                                <!--/ Form-Fields -->

                                <!-- Form-Buttons -->
                                <footer class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500">
                                        Submit
                                    </button>
                                    <button type="button"
                                        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        @click="closeModal" ref="cancelButtonRef">
                                        Cancel
                                    </button>
                                </footer>
                                <!--/ Form-Buttons -->
                            </form>
                            <!--/ Form -->
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { ref, computed, onUpdated } from 'vue';
import store from '../../../store';
import { DEFAULT_EMPTY_IMAGE } from '../../../constants';

const product = ref({
    id: props.product.id,
    title: props.product.title,
    image: props.product.image,
    image_url: props.product.image_url,
    description: props.product.description,
    price: props.product.price,
    published: props.product.published
});

/* On-Image-Choose */
function onImageChoose(e) {
    const file = e.target.files[0];

    /* The field to send on backend and apply validations */
    product.value.image = file;

    /* The field to display here */
    const reader = new FileReader();
    reader.onload = () => {
        product.value.image_url = reader.result;
        e.target.value = "";
    };
    reader.readAsDataURL(file);
}

const loading = ref(false);

const props = defineProps({
    modelValue: Boolean,
    product: {
        required: true,
        type: Object,
    }
});

const emit = defineEmits(['update:modelValue', 'close']);

const show = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
});

onUpdated(() => {
    product.value = {
        id: props.product.id,
        title: props.product.title,
        image: props.product.image,
        image_url: props.product.image_url,
        description: props.product.description,
        price: props.product.price,
        published: props.product.published,
    }
});

const closeModal = () => {
    show.value = false;
    emit('close');
}

/* On Form Submitted */
const onSubmit = () => {
    loading.value = true;
    if (product.value.id) {
        store.dispatch('updateProduct', product.value)
            .then(response => {
                loading.value = false;
                if (response.status === 200) {
                    store.commit('notify', {
                        message: 'Item updated successfully',
                        type: 'success'
                    });
                    store.dispatch('getProducts')
                    closeModal()
                }
            })
    } else {
        store.dispatch('createProduct', product.value)
            .then((response) => {
                loading.value = false;
                if (response.status === 201) {
                    store.commit('notify', {
                        message: 'Item added successfully',
                        type: 'success'
                    });
                    store.dispatch('getProducts')
                    closeModal()
                }
            })
            .catch(err => {
                loading.value = false;
                debugger;
            })
    }
}
</script>
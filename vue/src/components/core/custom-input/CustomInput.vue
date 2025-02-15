<template>
    <div>
        <!-- Label -->
        <label class="sr-only">
            {{ label }}
        </label>
        <!--/ Label -->

        <!-- Input-Fields -->
        <div class="mt-1 flex rounded-md shadow-sm">

            <!-- Prepend-Data -->
            <span v-if="prepend"
                class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {{ prepend }}
            </span>
            <!--/ Prepend-Data -->

            <!-- Input:Select -->
            <template v-if="type === 'select'">
                <select :name="name" :required="required" :value="props.modelValue" :class="inputClasses"
                    @change="onChange($event.target.value)">
                    <option v-for="option of selectOptions" :value="option.key">{{ option.text }}</option>
                </select>
            </template>
            <!--/ Input:Select -->

            <!-- Input:Textarea -->
            <template v-else-if="type === 'textarea'">
                <textarea :name="name" :required="required" :value="props.modelValue"
                    @input="emit('update:modelValue', $event.target.value)" :class="inputClasses"
                    :placeholder="label"></textarea>
            </template>
            <!--/ Input:Textarea -->

            <!-- Input:File -->
            <template v-else-if="type === 'file'">
                <input :type="type" :name="name" :required="required" :value="props.modelValue"
                    @input="emit('change', $event.target.files[0])" :class="inputClasses" :placeholder="label" />
            </template>
            <!--/ Input:File -->

            <!-- Input:Checkbox -->
            <template v-else-if="type === 'checkbox'">
                <input :id="id" :name="name" :type="type" :checked="props.modelValue" :required="required"
                    @change="emit('update:modelValue', $event.target.checked)"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                <label :for="id" class="ml-2 block text-sm text-gray-900"> {{ label }} </label>
            </template>
            <!--/ Input:Checkbox -->

            <!-- Input:Default -->
            <template v-else>
                <input :type="type" :name="name" :required="required" :value="props.modelValue"
                    @input="emit('update:modelValue', $event.target.value)" :class="inputClasses" :placeholder="label"
                    step="0.01" />
            </template>
            <!--/ Input:Default -->

            <!-- Append-Data -->
            <span v-if="append"
                class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {{ append }}
            </span>
            <!--/ Append-Data -->

        </div>
        <!--/ Input-Fields -->
    </div>
</template>

<script setup>

import { computed } from "vue";

/* Props */
const props = defineProps({
    modelValue: [String, Number, File],
    label: String,
    type: {
        type: String,
        default: 'text'
    },
    name: String,
    required: Boolean,
    prepend: {
        type: String,
        default: ''
    },
    append: {
        type: String,
        default: ''
    },
    selectOptions: Array
});

/* Id */
const id = computed(() => {
    if (props.id) return props.id;

    return `id-${Math.floor(1000000 + Math.random() * 1000000)}`;
});

/* Input-Classes */
const inputClasses = computed(() => {
    const cls = [
        `block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm`,
    ];

    if (props.append && !props.prepend) {
        cls.push(`rounded-l-md`)
    } else if (props.prepend && !props.append) {
        cls.push(`rounded-r-md`)
    } else if (!props.prepend && !props.append) {
        cls.push('rounded-md')
    }
    return cls.join(' ')
});

/* Emits */
const emit = defineEmits(['update:modelValue', 'change'])

/* On-Change Function */
function onChange(value) {
    emit('update:modelValue', value)
    emit('change', value)
}

</script>

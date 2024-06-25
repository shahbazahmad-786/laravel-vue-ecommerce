<template>
    <!-- <input :id="id" :name="name" :type="type" :checked="props.modelValue" :required="required"
        @change="emit('update:modelValue', $event.target.checked)"
        class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
    <label :for="id" class="ml-2 block text-sm text-gray-900"> {{ label }} </label> -->

    <label class="toggler-wrapper style-1">
        <input type="checkbox" :checked="checked">
        <div class="toggler-slider">
            <div class="toggler-knob"></div>
        </div>
    </label>
</template>

<script setup>
// const props = defineProps({
//     modelValue: [String, Number, File],
// });

const props = defineProps(['checked']);

// const emit = defineEmits(['updatePublished']);
</script>

<style scoped>
.toggler-wrapper {
    display: block;
    width: 45px;
    height: 25px;
    cursor: pointer;
    position: relative;
}

.toggler-wrapper input[type="checkbox"] {
    display: none;
}

.toggler-wrapper input[type="checkbox"]:checked+.toggler-slider {
    background-color: rgb(67 56 202);
}

.toggler-wrapper .toggler-slider {
    background-color: #ccc;
    position: absolute;
    border-radius: 100px;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}

.toggler-wrapper .toggler-knob {
    position: absolute;
    -webkit-transition: all 300ms ease;
    transition: all 300ms ease;
}


.toggler-wrapper.style-1 input[type="checkbox"]:checked+.toggler-slider .toggler-knob {
    left: calc(100% - 19px - 3px);
}

.toggler-wrapper.style-1 .toggler-knob {
    width: calc(25px - 6px);
    height: calc(25px - 6px);
    border-radius: 50%;
    left: 3px;
    top: 3px;
    background-color: #fff;
}
</style>
<template>
  <input type="number"
         :value="props.modelValue"
         @input="emits('update:modelValue', $event.target.value)"
         class="flex-1 rounded-md z-10 focus:ring-indigo-500 focus:border-indigo-500  block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
  >
</template>

<script setup lang='ts'>
const props = defineProps<{ modelValue: number }>()

const emits = defineEmits(['update:modelValue'])
</script>
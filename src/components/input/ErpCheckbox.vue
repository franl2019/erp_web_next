<template>
  <label :for="inputUuid"
         class="flex items-center w-full border border-solid border-gray-300 rounded p-2.5 select-none">
    <input :id="inputUuid" :checked="props.modelValue" @change="$emit('update:modelValue',newValue)" type="checkbox"
           class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
    <span class="ml-2 block text-sm text-gray-900"><slot></slot></span>
  </label>
</template>

<script setup lang="ts">
import {v4 as uuidv4} from 'uuid';
import {computed} from "vue";

const inputUuid = uuidv4();
const props = withDefaults(defineProps<{
  modelValue?: number
}>(),{
  modelValue:0
})
const newValue = computed(() => {
  return props.modelValue ? 0 : 1
})
</script>
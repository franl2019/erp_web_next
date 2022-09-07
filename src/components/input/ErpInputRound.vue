<template>
  <input ref="inputRef" type="text"
         v-bind="$attrs"
         :value="props.modelValue"
         @input="emits('update:modelValue', $event.target.value)"
         class="focus:ring-indigo-500 block h-10 w-full rounded sm:text-sm border-gray-300"
  >
</template>

<script setup lang='ts'>
import {ref} from "vue";

const props = defineProps<{ modelValue?: any }>()
const emits = defineEmits(['update:modelValue'])
const inputRef = ref();

function getNode() {
  return inputRef.value
}

defineExpose({getNode});
</script>

<style lang="scss" scoped>
input:disabled{
  background-color: #F5F7FA;
  //color: #A8ABB2;
}
</style>
<template>
  <input class="mx-2" type="checkbox" :checked="!props.modelValue" @change="$emit('update:modelValue',!props.modelValue)">
</template>

<script setup lang='ts'>
const props = defineProps<{
  modelValue?: boolean
}>()
</script>
<template>
  <div v-show="activation" class="w-full h-full">
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import {computed, getCurrentInstance} from "vue";

const props = withDefaults(defineProps<{
  label?: string;
  name?: string;
}>(), {
  label: "",
  name: ""
})

const currentInstance = getCurrentInstance();

const activation = computed(() => {
  const activationName = currentInstance?.parent?.props.modelValue || ''
  return activationName === props.name
})


</script>

<style lang='scss' scoped>

</style>
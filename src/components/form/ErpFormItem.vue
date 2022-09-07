<template>
  <div :class="formItemStyle">
    <label :class="labelForNameStyle">
      {{ props.labelForName }}
    </label>
    <div class="w-full max-h-10">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {computed} from "vue";

const props = withDefaults(defineProps<{
  labelForName?: string;
  type?: string;
  mdCol?: string;
  lgCol?: string;
}>(), {
  labelForName: '',
  type: 'info',
  mdCol: "8",
  lgCol: "8",
})

const formItemStyle = computed(() => {
  return `text-left col-span-8 md:col-span-${props.mdCol} lg:col-span-${props.lgCol}`
});

const labelForNameStyle = computed(() => {
  return `text-sm ${props.type === 'danger' ? 'text-red-600 font-bold' : ''}`
})


</script>
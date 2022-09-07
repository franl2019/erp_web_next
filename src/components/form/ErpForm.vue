<template>
  <div class="w-full">
    <div class="grid grid-cols-8 gap-x-2 gap-y-1 w-full pb-1" :class="props.px?'px-2':''">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = withDefaults(defineProps<{
  px?:boolean
}>(),{
  px:false
})
</script>
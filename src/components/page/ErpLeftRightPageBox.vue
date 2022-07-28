<template>
  <div class="flex w-full h-full px-2 pb-2">
    <div v-if="isVisibleLeft" class="w-64">
      <slot name="left"></slot>
    </div>
    <div class="flex flex-col flex-grow">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang='ts' setup>
const props = withDefaults(defineProps<{
  isVisibleLeft?:boolean
}>(),{
  isVisibleLeft:true
})
</script>

<style lang='scss' scoped>

</style>
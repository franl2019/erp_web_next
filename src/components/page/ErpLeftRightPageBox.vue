<template>
  <div class="flex h-full flex-grow px-2 py-2">
    <div v-if="isVisibleLeft" class="w-64 flex flex-col flex-none">
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
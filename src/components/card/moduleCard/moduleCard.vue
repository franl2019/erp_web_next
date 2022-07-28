<template>
  <div class="h-36 w-60 flex-none shadow-md border border-solid border-gray-300 p-3 hover:shadow-xl">
    <div class="mb-1 flex items-end justify-between">
      <div class="text-xl font-bold">{{ title }}</div>
      <div class="text-sm text-gray-900 cursor-pointer">查看</div>
    </div>
    <div class="border border-solid border-black mb-2"></div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  title:string;
}>()
</script>

<style lang="scss" scoped>
</style>
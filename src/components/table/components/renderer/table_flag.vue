<template>
  <div class="flex items-center justify-center">
    <div v-if="params.value" class="font-bold text-green-500 text-xl">√</div>
    <div v-else class="font-bold text-red-600 text-xl">×</div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{
  params: any
}>()
</script>
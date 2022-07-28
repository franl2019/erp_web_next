<template>
  <div class="card-text-item flex justify-between">
    <div>{{content}}</div>
    <div class="text-red-400 font-bold">{{count}}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  content:string;
  count:number;
}>()
</script>

<style lang="scss" scoped>
.card-text-item{
}
</style>
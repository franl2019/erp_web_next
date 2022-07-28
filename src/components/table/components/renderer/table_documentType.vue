<template>
  <div>{{ value }}</div>
</template>
<script setup lang='ts'>
import {ref} from "vue";

const props = defineProps<{
  params: any
}>();

const value = ref<string>("");
switch (props.params.value) {
  case 1:
    value.value = "采购进仓单[1]";
    break;
  default:
    value.value = "类型错误"
    break;
}
</script>
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
  case 0:
    value.value = "出纳收入单[0]";
    break;
  case 1:
    value.value = "出纳支出单[1]";
    break;
  default:
    value.value = "类型错误"
    break;
}
</script>
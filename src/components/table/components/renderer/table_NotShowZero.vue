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
  case '0.00':
    value.value = "";
    break;
  default:
    value.value = props.params.value
    break;
}
</script>
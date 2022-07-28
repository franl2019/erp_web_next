<template>
  <div>{{ value }}</div>
</template>
<script setup lang='ts'>
import {ref} from "vue";
import {AccountCategoryType} from "@/types/AccountCategoryType";

const props = defineProps<{
  params: any
}>();

const value = ref<string>("");
switch (props.params.value) {
  case AccountCategoryType.accountsPayable4:
    value.value = "应付账款[4]";
    break;
  case AccountCategoryType.prepayments5:
    value.value = "预付账款[5]";
    break;
  case AccountCategoryType.otherPayable6:
    value.value = "其他应付[6]";
    break;
  default:
    value.value = "类型错误"
    break;
}
</script>
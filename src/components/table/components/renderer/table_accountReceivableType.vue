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
  case AccountCategoryType.accountsReceivable1:
    value.value = "应收账款[1]";
    break;
  case AccountCategoryType.advancePayment2:
    value.value = "预收账款[2]";
    break;
  case AccountCategoryType.otherReceivables3:
    value.value = "其他应收[3]";
    break;
  default:
    value.value = "类型错误"
    break;
}
</script>
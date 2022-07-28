<template>
  <div>{{ value }}</div>
</template>
<script setup lang='ts'>
import {ref} from "vue";
import {AccountsVerifySheetType} from "@/module/accountsVerifySheet/accountsVerifySheet";

const props = defineProps<{
  params: any
}>();

const value = ref<string>("");
switch (props.params.value) {
  case AccountsVerifySheetType.advancePayment_accountsReceivable_1:
    value.value = "预收冲应收[1]";
    break;
  case AccountsVerifySheetType.prepayments_accountsPayable_2:
    value.value = "预付冲应付[2]";
    break;
  case AccountsVerifySheetType.accountsReceivable_accountsPayable_3:
    value.value = "应收冲应付[3]";
    break;
  case AccountsVerifySheetType.accountsReceivable_accountsReceivable_4:
    value.value = "应收转应收[4]";
    break;
  case AccountsVerifySheetType.accountsPayable_accountsPayable_5:
    value.value = "应付转应付[5]";
    break;
  default:
    value.value = "类型错误"
    break;
}
</script>
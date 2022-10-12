<template>
  <div>{{ value }}</div>
</template>
<script lang='ts'>
import {defineComponent, ref} from "vue";
import {AccountCategoryType} from "@/types/AccountCategoryType";

export default defineComponent({
  name:"TableAccountReceivableType",
  props: ["params"],
  setup(props) {
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
    return {
      value,
    };
  },
});
</script>
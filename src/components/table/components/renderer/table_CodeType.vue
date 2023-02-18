<template>
  <div>{{ value }}</div>
</template>
<script lang='ts'>
import {defineComponent, ref} from "vue";
import {CodeType} from "@/types/CodeType";

export default defineComponent({
  name: "TableCodeType",
  props: ["params"],
  setup(props) {
    const value = ref<string>("");
    switch (props.params.value) {
      case CodeType.buyInbound:
        value.value = "采购进仓单[1]";
        break;
      case CodeType.HXD:
        value.value = "核销单[20]";
        break;
      case CodeType.SC:
        value.value = "生产进仓[6]";
        break;
      case CodeType.accountExpenditure:
        value.value = "采购付款单[17]";
        break;
      case CodeType.accountInCome:
        value.value = "销售收入单[19]";
        break;
      case CodeType.XS:
        value.value = "销售出仓单[8]";
        break;
      case -1:
        value.value = "期初余额";
        break;
      case -2:
        value.value = "小计";
        break;
      default:
        value.value = props.params.value
        break;
    }
    return {
      value,
    };
  },
});
</script>
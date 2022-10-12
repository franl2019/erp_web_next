<template>
  <div>{{ value }}</div>
</template>
<script lang='ts'>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name:"TableAccountRecordReceiptType",
  props:["params"],
  setup(props) {
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
    return {
      value,
    };
  },
});
</script>
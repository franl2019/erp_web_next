<template>
  <div>{{ value }}</div>
</template>
<script lang='ts'>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "TableDocumentType",
  props: ["params"],
  setup(props) {
    const value = ref<string>("");
    switch (props.params.value) {
      case 1:
        value.value = "采购进仓单[1]";
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
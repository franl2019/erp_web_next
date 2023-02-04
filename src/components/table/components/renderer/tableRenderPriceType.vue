<template>
  <div>{{ value }}</div>
</template>
<script lang='ts'>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name:"tableRenderPriceType",
  props: ["params"],
  setup(props) {
    const value = ref<string>("");
    switch (props.params.value) {
      case 0:
        value.value = "按件计价";
        break;
      case 1:
        value.value = "按包计价";
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
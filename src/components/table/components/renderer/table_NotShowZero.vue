<template>
  <div>{{ value }}</div>
</template>
<script lang='ts'>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "TableNotShowZero",
  props: ["params"],
  setup(props) {
    const value = ref<string>("");
    switch (props.params.value) {
      case '0.00':
        value.value = "";
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
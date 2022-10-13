<template>
  <div>{{ value }}</div>
</template>
<script lang='ts'>
import {defineComponent, ref, unref} from "vue";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";

export default defineComponent({
  name:"TableAbsolutely",
  props: ["params"],
  setup(props) {
    const value = ref<string>("");
    value.value = toFixed2(Number(unref(props.params.value)) * 100)
    return {
      value
    };
  },
});
</script>
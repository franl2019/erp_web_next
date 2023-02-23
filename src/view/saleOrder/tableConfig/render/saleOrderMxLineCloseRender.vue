<template>
  <a v-if="$props.params.value === 0" class="font-bold text-red-500">
    关闭
  </a>
</template>

<script lang='ts'>
import {defineComponent} from "vue";

export default defineComponent({
  name: "SaleOrderMxLineCloseRender",
  props:["params"],
  setup() {

  },
});
</script>
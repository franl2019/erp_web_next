<template>
  <div class="flex flex-col h-full px-2 py-2 space-y-1">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from 'vue';

export default defineComponent({
  name:"ErpPageBox",
  setup() {
    return {};
  },
});
</script>

<style lang='scss' scoped>

</style>
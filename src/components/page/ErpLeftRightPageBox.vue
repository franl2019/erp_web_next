<template>
  <div class="flex h-full flex-grow px-2 py-2">
    <div v-if="isVisibleLeft" class="w-64 flex flex-col flex-none">
      <slot name="left"></slot>
    </div>
    <div class="flex flex-col flex-grow">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang='ts'>import { defineComponent } from 'vue';

export default defineComponent({
  name:"ErpLeftRightPageBox",
  props: {
    isVisibleLeft: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
    };
  },
});
</script>

<style lang='scss' scoped>

</style>
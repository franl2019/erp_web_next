<template>
  <div class="flex flex-col h-full flex-grow px-2 py-2">
    <div class="flex-none h-auto w-full">
      <slot name="default"></slot>
    </div>
    <div class="flex-grow flex flex-row">
      <div v-if="isVisibleLeft" class="w-64 flex flex-col flex-none pr-2">
        <slot name="left"></slot>
      </div>
      <div class="flex-grow flex flex-col">
        <slot name="right"></slot>
      </div>
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
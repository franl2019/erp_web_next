<template>
  <div class="w-full">
    <div class="grid grid-cols-8 gap-x-2 gap-y-1 w-full pb-1" :class="props.px?'px-2':''">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>import { defineComponent } from 'vue';

export default defineComponent({
  name:"ErpForm",
  props: {
    px: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
});
</script>
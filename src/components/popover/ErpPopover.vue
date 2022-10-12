<template>
  <div ref="referenceRef" class="w-full h-full">
    <slot name="reference"></slot>
    <div v-show="popoverVisible" ref="popperRef">
      <slot name="popper"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import {defineComponent, onMounted, PropType, ref, unref} from "vue";
import {createPopper,Placement} from "@popperjs/core";

export default defineComponent({
  name:"ErpPopover",
  props: {
    popoverVisible: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom-start',
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const referenceRef = ref();
    const popperRef = ref();
    const {placement,offsetX,offsetY} = unref(props);

    onMounted(() => {
      createPopper(referenceRef.value, popperRef.value, {
        placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [offsetX, offsetY],
            },
          },
        ]
      });
    });

    return {
      referenceRef,
      popperRef,
    };
  },
});
</script>
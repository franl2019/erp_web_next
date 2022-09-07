<template>
  <div ref="referenceRef"
       class="w-full h-full">
    <slot name="reference"></slot>
    <div ref="popperRef" v-show="props.popoverVisible">
      <slot name="popper"></slot>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {onMounted, ref} from "vue";
import {createPopper} from "@popperjs/core";

type Placement =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';

const props = withDefaults(defineProps<{
  popoverVisible?:boolean,
  placement?:Placement,
  offsetX?:number,
  offsetY?:number
}>(),{
  popoverVisible:true,
  placement:'bottom-start',
  offsetX:0,
  offsetY:0
})

const referenceRef = ref();
const popperRef = ref();




onMounted(()=>{
  createPopper(referenceRef.value, popperRef.value, {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [props.offsetX, props.offsetY],
        },
      },
    ]
  });
})
</script>
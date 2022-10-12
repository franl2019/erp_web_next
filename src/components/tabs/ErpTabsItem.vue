<template>
  <div class="flex-none py-1 h-full w-24 flex flex-col select-none" @click="onClickTabs">
    <div
      class="flex-grow flex justify-center items-center font-bold text-sm text-black tracking-widest rounded cursor-pointer"
      :class="activation ? 'bg-white':'text-white active:bg-green-600'">
      {{ props.label }}
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name:"ErpTabsItem",
  props: {
    activationName: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
  },
  emits: [
    'onClickTabs'
  ],
  setup(props, { emit: emits }) {
    const activation = computed(() => {
      return props.activationName === props.name
    })

    function onClickTabs() {
      emits('onClickTabs', props.name)
    }
    return {
      props,
      activation,
      onClickTabs,
    };
  },
});
</script>

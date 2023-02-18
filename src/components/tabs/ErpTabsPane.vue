<template>
  <div v-show="activation" class="w-full h-full">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name:"ErpTabsPane",
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const currentInstance = getCurrentInstance();
    const activation = computed(() => {
      const activationName = currentInstance?.parent?.props.modelValue || ''
      return activationName === props.name
    })
    return {
      activation
    };
  },
});
</script>
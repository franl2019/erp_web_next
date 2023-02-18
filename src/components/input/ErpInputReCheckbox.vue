<template>
  <input class="mx-2" type="checkbox" :checked="!$props.modelValue"
    @change="$emit('update:modelValue',!$props.modelValue)">
</template>

<script lang='ts'>
import {defineComponent} from 'vue';

export default defineComponent({
  name:"ErpInputReCheckbox",
  props: ["modelValue"],
  setup() {
    return {
    };
  },
});
</script>
<template>
  <input ref="inputRef" :value="modelValue" class="focus:ring-indigo-500 block h-10 w-full rounded sm:text-sm border-gray-300" type="text"
         v-bind="$attrs"
         @input="$emit('update:modelValue', $event.target.value)">
</template>

<script lang='ts'>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "ErpInputRound",
  expose: ["getNode"],
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup() {
    const inputRef = ref();

    function getNode() {
      return inputRef.value
    }

    return {
      inputRef,
      getNode,
    };
  },
});
</script>

<style lang="scss" scoped>
input:disabled {
  background-color: #F5F7FA;
  //color: #A8ABB2;
}
</style>
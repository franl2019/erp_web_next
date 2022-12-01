<template>
  <input ref="inputRef"
         :type="$props.type"
         :value="$props.modelValue"
         class="border border-solid border-gray-300
         focus:outline-none
         focus:border-2 focus:border-indigo-500
         px-2 block h-10 w-full rounded sm:text-sm"
         v-bind="$attrs"
         @input="$emit('update:modelValue', $event.target.value)">
</template>

<script lang='ts'>
import {defineComponent, PropType, ref} from "vue";

type HTMLInputTypeAttributeType =
    "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"


export default defineComponent({
  name: "ErpInputRound",
  props: {
    modelValue: {
      type: null as any as PropType<any>
    },
    type: {
      type: String as PropType<HTMLInputTypeAttributeType>,
      default: 'text'
    }
  },
  emits: ["update:modelValue"],
  setup(_props, {expose}) {
    const inputRef = ref();

    function getNode() {
      return inputRef.value
    }

    expose({getNode})

    return {
      inputRef,
    };
  },
});
</script>

<style lang="scss" scoped>
input:disabled {
  background-color: #F5F7FA;
}
</style>
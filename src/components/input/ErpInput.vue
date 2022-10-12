<template>
  <input :placeholder="props.placeholder"
         :type="props.type"
         :value="modelValue"
         class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
         required
         @input="emits('update:modelValue', $event.target.value)">
</template>

<script lang='ts'>
import {defineComponent} from 'vue';

export default defineComponent({
  name:"ErpInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit: emits}) {
    return {
      props,
      emits,
    };
  },
});
</script>
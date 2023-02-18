<template>
  <label :class="borderClass" :for="checkBoxId" class="flex items-center w-full rounded select-none">
    <input :id="checkBoxId" :checked="props.modelValue" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" type="checkbox"
           @change="$emit('update:modelValue',newValue)">
    <span class="ml-2 block text-sm text-gray-900">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import {v4 as uuidV4} from 'uuid';
import {computed, defineComponent, ref} from "vue";

export default defineComponent({
  name: "ErpCheckBox",
  props: {
    modelValue: {
      type: Number || Boolean,
      default: 0,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const checkBoxId = uuidV4();
    const borderClass = ref(props.border ? 'border border-solid border-gray-300 p-2.5' : '');
    const newValue = computed(() => {
      return props.modelValue ? 0 : 1
    })
    return {
      checkBoxId,
      props,
      borderClass,
      newValue,
    };
  },
});
</script>
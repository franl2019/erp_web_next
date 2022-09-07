<template>
  <input :type="props.type"
         required
         :value="modelValue"
         @input="emits('update:modelValue', $event.target.value)"
         class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
         :placeholder="props.placeholder">
</template>

<script setup lang='ts'>
const props = withDefaults(defineProps<{
  modelValue?: string,
  placeholder?: string,
  required?:boolean
  type?:string
}>(),{
  modelValue:"",
  placeholder:"",
  required:true,
  type:""
})

const emits = defineEmits(['update:modelValue'])

</script>
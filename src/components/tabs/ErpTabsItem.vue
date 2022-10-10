<template>
  <div class="flex-none py-1 h-full w-24 flex flex-col select-none"

       @click="onClickTabs">
    <div class="flex-grow flex justify-center items-center font-bold text-sm text-black tracking-widest rounded cursor-pointer" :class="activation ? 'bg-white':'text-white active:bg-green-600'">
      {{ props.label }}
    </div>
<!--    <div class="flex-none h-0.5 w-full">-->
<!--      <div v-show="activationName === name" class="h-full w-full bg-white"></div>-->
<!--      <div v-show="activationName !== name" class="h-full w-full"></div>-->
<!--    </div>-->
  </div>
</template>

<script lang='ts' setup>

import {computed} from "vue";

const props = withDefaults(defineProps<{
  activationName?: string;
  label: string;
  name: string;
}>(), {
  activationName: "",
  label: "",
  name: ""
})

const emits = defineEmits([
  'onClickTabs'
])

const activation = computed(()=>{
  return props.activationName === props.name
})

function onClickTabs() {
  emits('onClickTabs', props.name)
}
</script>

<style lang='scss' scoped>

</style>
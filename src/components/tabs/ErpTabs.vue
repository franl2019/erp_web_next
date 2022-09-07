<template>
  <div class="flex flex-col w-full h-full">
    <div class="h-9 w-full flex flex-row items-start overflow-x-auto bg-green-500 shadow-2xl space-x-1 px-1">
      <erp-tabs-item v-for="vNode in defaultSlotVNodeList" :activation-name="props.modelValue"
                     :label="vNode.props.label" :name="vNode.props.name" v-bind="$attrs"></erp-tabs-item>
    </div>
    <div class="w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {useSlots, VNode} from "vue";
import ErpTabsItem from "@/components/tabs/ErpTabsItem.vue";

const props = withDefaults(defineProps<{
  modelValue?: string
}>(), {
  modelValue: ""
})

const slots = useSlots()

const defaultSlotVNodeList: VNode[] = slots.default!()

</script>

<style lang='scss' scoped>

</style>
<template>
  <div v-show="popoverVisible" class="fixed inset-0 sm:h-screen w-full" @click.stop.prevent="onClickInput"></div>
  <div class="relative">
    <input
        class="focus:ring-indigo-500 block h-10 w-full rounded sm:text-sm border-gray-300 cursor-pointer"
        type="text"
        readonly
        :value="label"
        @click.stop="onClickInput"
        placeholder="点击选择"
    />
    <div class="absolute top-0 w-full h-full cursor-pointer flex justify-end items-center px-2" @click.stop="onClickInput">
      <img class="h-5 w-5 select-none transform rotate-0 transition" :class="popoverVisible?`rotate-180`:``" src="@/assets/expand_more_black_24dp.svg" alt="btn">
    </div>
    <div class="h-0 w-full relative z-10">
      <div v-show="popoverVisible"
           class="absolute top-1 border border-solid rounded h-52 w-full overflow-x-auto bg-white shadow-xl">
        <erp-tree
            :data="treeProps.data"
            :node-key="treeProps.nodeKey"
            :props="treeProps.props"
            :model-value="treeProps.modelValue"
            v-bind="$attrs"
            @node-click="onNodeClick"
        ></erp-tree>
      </div>
    </div>
  </div>

</template>

<script lang='ts' setup>
import {ref} from "vue";
import ErpTree from "@/components/tree/ErpTree.vue";

const popoverVisible = ref(false);
const label = ref('')
const emits = defineEmits(['node-click','update:modelValue'])
const treeProps = withDefaults(defineProps<{
  data: Array<any>;
  props: {
    label: string;
    children: string;
  };
  nodeKey: string;
  modelValue:any;
}>(), {})

function onNodeClick(node: any) {

  label.value = node[treeProps.props.label]
  emits('update:modelValue',node[treeProps.nodeKey])
  emits('node-click', node)
  popoverVisible.value = false
}

function onClickInput() {
  popoverVisible.value = !popoverVisible.value
}
</script>

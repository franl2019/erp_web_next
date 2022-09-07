<template>
  <div class="w-full h-full">
    <erp-tree-item
        v-for="item in data"
        :id="item[nodeKey]"
        :children="treeProps.props.children"
        :expand-on-click-node="treeProps.expandOnClickNode"
        :item="item"
        :key="item[nodeKey]"
        :label="treeProps.props.label"
        :model-value="selectedNodeId"
        :modelValue="modelValue"
        :nodeKey="nodeKey"
        :uuid="treeUuid"
    >
    </erp-tree-item>
  </div>
</template>

<script lang='ts' setup>
import ErpTreeItem from "@/components/tree/ErpTreeItem.vue";
import {nextTick, onMounted, ref, watch} from "vue";
import {erpTreeEventBus} from "@/components/tree/eventBus";
import {v4 as uuidv4} from 'uuid';

const treeProps = withDefaults(defineProps<{
  data: Array<any>;
  props: {
    label: string;
    children: string;
  },
  nodeKey: string;
  modelValue?: any;
  //展开点击节点
  expandOnClickNode?: boolean
}>(), {
  expandOnClickNode: true
})

const emits = defineEmits(['node-click', 'onReady', 'update:modelValue'])
const treeUuid = uuidv4();

const selectedNodeId = ref(treeProps.modelValue) || ref(0)
const selectedNode = ref();

erpTreeEventBus.on('treeItemClickNode' + treeUuid, (event: any) => {
  selectedNode.value = event;
  selectedNodeId.value = event[treeProps.nodeKey];
  emits('node-click', event)
})

onMounted(() => {
  nextTick(() => {
    window.document.getElementById(treeProps.modelValue)?.scrollIntoView(true)
  })
  emits('onReady', treeApi)
})

watch(() => treeProps.data, () => {
  emits('update:modelValue', 0)
});

const treeApi = {
  getSelectedNode: () => {
    return selectedNode.value
  },setSelectedNode:(id:number)=>{
    emits('update:modelValue', id)
  }
}

</script>

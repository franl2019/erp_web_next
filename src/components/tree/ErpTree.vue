<template>
  <div class="w-full h-full">
    <erp-tree-item v-for="item in data" :id="item[nodeKey]" :children="treeProps.config.children"
      :expand-on-click-node="treeProps.expandOnClickNode" :item="item" :key="item[nodeKey]"
      :label="treeProps.config.label" :model-value="selectedNodeId" :modelValue="modelValue" :nodeKey="nodeKey"
      :uuid="treeUuid">
    </erp-tree-item>
  </div>
</template>

<script lang='ts'>
import ErpTreeItem from "@/components/tree/ErpTreeItem.vue";
import { defineComponent, nextTick, onMounted, PropType, ref, watch } from "vue";
import { erpTreeEventBus } from "@/components/tree/eventBus";
import { v4 as uuidV4 } from 'uuid';

export default defineComponent({
  name:"ErpTree",
  components:{
    ErpTreeItem
  },
  props: {
    data: {
      type: Object as PropType<Array<any>>,
      required: true,
    },
    config: {
      type: Object as PropType<{
        label: string;
        children: string;
      }>,
      required: true,
    },
    nodeKey: {
      type: String,
      required: true,
    },
    modelValue: null as any as PropType<any>,
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['node-click', 'onReady', 'update:modelValue'],
  setup(treeProps, { emit: emits }) {
    const treeUuid = uuidV4();
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
      }, setSelectedNode: (id: number) => {
        emits('update:modelValue', id)
      }
    }

    return {
      uuidV4,
      treeProps,
      treeUuid,
      selectedNodeId,
      selectedNode,
    };
  },
});
</script>

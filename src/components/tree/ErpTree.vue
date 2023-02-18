<template>
  <div class="w-full h-full">
    <erp-tree-item
        v-for="item in data"
        :key="item[nodeKey]"
        :children="config.children"
        :expandAll="expandAll"
        :item="item"
        :label="config.label"
        :modelValue="selectedNodeId"
        :nodeKey="nodeKey"
        :select-node-call-back="selectNodeCallBack"
    >
    </erp-tree-item>
  </div>
</template>

<script lang='ts'>
import ErpTreeItem from "@/components/tree/ErpTreeItem.vue";
import {defineComponent, nextTick, onMounted, PropType, ref, watch} from "vue";

export default defineComponent({
  name: "ErpTree",
  components: {
    ErpTreeItem
  },
  props: {
    data: {
      type: Array as PropType<Array<any>>,
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
    modelValue: {
      type:null as any as PropType<any>,
      default:0
    },
    expandAll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['node-click', 'update:modelValue'],
  setup(props, {emit, expose}) {
    const selectedNodeId = ref(props.modelValue) || ref(0)
    const selectedNode = ref();

    function selectNodeCallBack(node:any) {
      selectedNode.value = node;
      selectedNodeId.value = node[props.nodeKey];
      emit('node-click', node)
    }

    onMounted(() => {
      nextTick(() => {
        window.document.getElementById(selectedNodeId)?.scrollIntoView(true)
      })
    })

    watch(() => props.data, () => {
      emit('update:modelValue', 0)
    });

    function getSelectedNode() {
      return selectedNode.value
    }

    function setSelectedNode(id: number) {
      emit('update:modelValue', id)
    }

    expose({getSelectedNode, setSelectedNode});

    return {
      selectedNodeId,
      selectedNode,
      selectNodeCallBack,
    };
  },
});
</script>

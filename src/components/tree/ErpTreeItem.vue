<template>
  <div :id="id" :class="selected?'bg-gray-100':''" :style="`padding-left:${props.pl}px;`"
       class="flex items-center h-10 w-full bg-white hover:bg-gray-50 active:bg-gray-100 select-none px-2 overflow-x-hidden cursor-pointer"
       @click.stop="onClickedTreeItem(props.item)">
    <div class="w-6">
      <div v-show="isShowExpansionButton" @click.stop="onClickedTreeItemIcon">
        <img :class="isExpansion?'rotate-0':'-rotate-90'" alt="button"
             class="transform" src="@/assets/arrow_drop_down_black_24dp.svg">
      </div>

    </div>
    <div class="flex flex-none justify-start items-center text-sm text-gray-600">{{ item[label] }}</div>
  </div>
  <div v-show="isExpansion" class="w-full">
    <erp-tree-item v-for="itemChildren in item[children]" :id="itemChildren[nodeKey]" :key="itemChildren[nodeKey]"
                   :children="children" :expand-on-click-node="props.expandOnClickNode" :item="itemChildren"
                   :label="label"
                   :modelValue="modelValue" :nodeKey="nodeKey" :pl="props.pl+18" :uuid="props.uuid"></erp-tree-item>
  </div>

</template>

<script lang='ts'>
import {computed, defineComponent, onMounted, PropType, ref, watch} from "vue";
import {erpTreeEventBus} from "@/components/tree/eventBus";

export default defineComponent({
  name:"ErpTreeItem",
  props: {
    label: {
      type: String,
      required: true,
    },
    children: {
      type: String,
      required: true,
    },
    nodeKey: {
      type: String,
      required: true,
    },
    modelValue: null as any as PropType<any>,
    id: {
      type: null as any as PropType<string | number>,
      required: true,
    },
    item: {
      type: null as any as PropType<any>,
      default: [],
    },
    pl: {
      type: Number,
      default: 0,
    },
    expandOnClickNode: {
      type: Boolean,
      default: true,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  setup(props) {

    onMounted(() => {
      //根据modelValue找到当前选中
      if (props.item[props.nodeKey] === props.modelValue) {
        erpTreeEventBus.emit('treeItemClickNode' + props.uuid, props.item)
      }
    })

    watch(() => props.item, () => {
      console.log(props.modelValue)
      if (props.item[props.nodeKey] === props.modelValue) {
        console.log('我要出来了!!')
        erpTreeEventBus.emit('treeItemClickNode' + props.uuid, props.item)
      }
    })

    const selected = computed(() => {
      return props.modelValue === props.item[props.nodeKey]
    })

    //是否展开
    const isExpansion = ref(true);

    //是否显示展开按钮
    const isShowExpansionButton = computed(() => {
      //children 数组大于0才能展开
      return props.item[props.children] !== undefined && props.item[props.children].length > 0
    })

    function onClickedTreeItem(item: any) {
      if (props.expandOnClickNode) {
        isExpansion.value = !isExpansion.value;
        erpTreeEventBus.emit('treeItemClickNode' + props.uuid, item)
      } else {
        erpTreeEventBus.emit('treeItemClickNode' + props.uuid, item)
      }
    }

    function onClickedTreeItemIcon() {
      if (!props.expandOnClickNode) {
        isExpansion.value = !isExpansion.value;
      }
    }

    return {
      props,
      selected,
      isExpansion,
      isShowExpansionButton,
      onClickedTreeItem,
      onClickedTreeItemIcon,
    };
  },
});
</script>

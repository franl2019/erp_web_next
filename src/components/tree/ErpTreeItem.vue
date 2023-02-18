<template>
  <div :id="item[nodeKey]"
       :class="selected?'bg-gray-100':''"
       :style="`padding-left:${pl}px;`"
       class="flex items-center h-10 w-full
              bg-white hover:bg-gray-50 active:bg-gray-100
              select-none px-2 overflow-x-hidden cursor-pointer"
       @click.stop="onClickedTreeItem(item)">
    <!--展开按钮-->
    <div class="w-6">
      <div v-show="isShowExpansionButton" @click.stop="onClickedTreeItemIcon">
        <img :class="isExpansion?'rotate-0':'-rotate-90'" alt="button"
             class="transform" src="@/assets/arrow_drop_down_black_24dp.svg">
      </div>
    </div>
    <!--文本-->
    <div class="flex flex-none justify-start items-center text-sm text-gray-600">{{ item[label] }}</div>
  </div>
  <div v-show="isExpansion">
    <erp-tree-item
        v-for="itemChildren in item[children]"
        :key="itemChildren[nodeKey]"
        :children="children"
        :expandAll="expandAll"
        :item="itemChildren"
        :label="label"
        :modelValue="modelValue"
        :nodeKey="nodeKey"
        :pl="pl+18"
        :select-node-call-back="selectNodeCallBack"
    >
    </erp-tree-item>
  </div>


</template>

<script lang='ts'>
import {computed, defineComponent, onMounted, PropType, ref} from "vue";

export default defineComponent({
  name: "ErpTreeItem",
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
    item: {
      type: null as any as PropType<any>,
      default: [],
    },
    pl: {
      type: Number,
      default: 0,
    },
    expandAll: {
      type: Boolean,
      default: true,
    },
    selectNodeCallBack:{
      type:Function as PropType<(node:any)=>void>,
      required:true
    }
  },
  setup(props) {

    onMounted(() => {
      //根据modelValue找到当前选中
      if (props.item[props.nodeKey] === props.modelValue) {
        props.selectNodeCallBack(props.item);
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
      if (props.expandAll) {
        isExpansion.value = !isExpansion.value;
        props.selectNodeCallBack(item)
      } else {
        props.selectNodeCallBack(item)
      }
    }

    function onClickedTreeItemIcon() {
      if (!props.expandAll) {
        isExpansion.value = !isExpansion.value;
      }
    }

    return {
      selected,
      isExpansion,
      isShowExpansionButton,
      onClickedTreeItem,
      onClickedTreeItemIcon,
    };
  },
});
</script>

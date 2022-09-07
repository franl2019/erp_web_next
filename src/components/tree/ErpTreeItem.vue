<template>
  <div
      :id="id"
      :class="selected?'bg-gray-100':''"
      :style="`padding-left:${props.pl}px;`"
      class="flex items-center h-10 w-full bg-white hover:bg-gray-50 active:bg-gray-100 select-none px-2 overflow-x-hidden cursor-pointer"
      @click.stop="onClickedTreeItem(props.item)"
  >
    <div
        class="w-6"
    >
      <div
          v-show="isShowExpansionButton"
          @click.stop="onClickedTreeItemIcon"
      >
        <img class="transform" :class="isExpansion?'rotate-0':'-rotate-90'" src="@/assets/arrow_drop_down_black_24dp.svg" alt="button">
      </div>

    </div>
    <div class="flex flex-none justify-start items-center text-sm text-gray-600">{{ item[label] }}</div>
  </div>
  <div
      v-show="isExpansion"
      class="w-full"
  >
    <erp-tree-item
        v-for="itemChildren in item[children]"
        :id="itemChildren[nodeKey]"
        :children="children"
        :expand-on-click-node="props.expandOnClickNode"
        :item="itemChildren"
        :label="label"
        :modelValue="modelValue"
        :key="itemChildren[nodeKey]"
        :nodeKey="nodeKey"
        :pl="props.pl+18"
        :uuid="props.uuid"
    ></erp-tree-item>
  </div>

</template>

<script lang='ts' setup>
import {computed, onMounted, ref, watch} from "vue";
import {erpTreeEventBus} from "@/components/tree/eventBus";

const props = withDefaults(defineProps<{
  label: string;
  children: string;
  nodeKey: string;
  modelValue?: any;
  id: string | number,
  item?: any,
  //padding-left
  pl?: number,
  //展开点击节点
  expandOnClickNode?: boolean,
  uuid:string
}>(), {
  item: [],
  pl: 0,
  expandOnClickNode: true
})

onMounted(()=>{
  //根据modelValue找到当前选中
  if(props.item[props.nodeKey] === props.modelValue){
    erpTreeEventBus.emit('treeItemClickNode'+props.uuid, props.item)
  }
})

watch(()=>props.item,()=>{
  console.log(props.modelValue)
  if(props.item[props.nodeKey] === props.modelValue){
    console.log('我要出来了!!')
    erpTreeEventBus.emit('treeItemClickNode'+props.uuid, props.item)
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
    erpTreeEventBus.emit('treeItemClickNode'+props.uuid, item)
  } else {
    erpTreeEventBus.emit('treeItemClickNode'+props.uuid, item)
  }
}

function onClickedTreeItemIcon() {
  if (!props.expandOnClickNode) {
    isExpansion.value = !isExpansion.value;
  }
}

</script>

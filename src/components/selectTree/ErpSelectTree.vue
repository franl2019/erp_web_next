<template>
  <div v-show="popoverVisible" class="fixed inset-0 sm:h-screen w-full z-10" @click.stop.prevent="onClickInput"></div>
  <div class="relative z-10">
    <!--选中信息文本框-->
    <ErpInputRound :value="label"
           class="focus:ring-indigo-500 block h-10 w-full rounded sm:text-sm border-gray-300 cursor-pointer"
           placeholder="点击选择" readonly type="text" @click.stop="onClickInput"/>
    <!--下拉图标-->
    <ErpSelectPullDownIcon :on-click-input="onClickInput" :popover-visible="popoverVisible"/>
    <!--下拉菜单-->
    <ErpSelectPullDownMenu :config="config" :data="data" :model-value="modelValue" :node-key="nodeKey"
                  :on-node-click="onNodeClick" :popover-visible="popoverVisible"/>
  </div>

</template>

<script lang='ts'>
import {defineComponent, ref} from "vue";
import ErpTree from "@/components/tree/ErpTree.vue";
import ErpSelectPullDownMenu from "@/components/selectTree/ErpSelectPullDownMenu.vue";
import ErpSelectPullDownIcon from "@/components/selectTree/ErpSelectPullDownIcon.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";

export default defineComponent({
  components: {
    ErpInputRound,
    ErpSelectPullDownIcon,
    ErpSelectPullDownMenu,
    ErpTree
  },
  props: ["data", "config", "nodeKey", "modelValue"],
  emits: ['node-click', 'update:modelValue'],
  setup(props, {emit}) {
    const popoverVisible = ref(false);
    const label = ref('')

    function onNodeClick(node: any) {
      label.value = node[props.config.label]
      emit('update:modelValue', node[props.nodeKey])
      emit('node-click', node)
      popoverVisible.value = false
    }

    function onClickInput() {
      popoverVisible.value = !popoverVisible.value
    }

    return {
      popoverVisible,
      label,
      onNodeClick,
      onClickInput,
    };
  },
});
</script>

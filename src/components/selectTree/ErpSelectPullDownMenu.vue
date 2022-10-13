<template>
  <div class="h-0 w-full relative z-10">
    <div v-show="popoverVisible"
         class="absolute top-1 border border-solid rounded h-52 w-full overflow-x-auto bg-white shadow-xl">
      <erp-tree :config="config" :data="data" :model-value="modelValue"
                :node-key="nodeKey" v-bind="$attrs" @node-click="onNodeClick"></erp-tree>
    </div>
  </div>
</template>
<script lang="ts">
import ErpTree from "@/components/tree/ErpTree.vue"

export default {
  name: 'ErpSelectPullDownMenu',
  components: {ErpTree},
  props: {
    config: {},
    data: {},
    modelValue: {},
    nodeKey: {},
    onNodeClick: {},
    popoverVisible: {}
  }
}
</script>
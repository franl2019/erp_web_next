<template>
  <el-tree-select
      ref="ElSelectRef"
      :data="clientAreaList"
      :props="clientAreaTreeConfig"
      check-strictly
      filterable
      node-key="clientareaid"
      v-bind="$attrs"/>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IClientArea} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

export default defineComponent({
  name:"ErpClientAreaSelect",
  expose:["focus"],
  setup() {
    const ElSelectRef = ref();
    const clientAreaList = ref<IClientArea[]>([]);
    const clientAreaService = new ClientAreaService();
    //客户地区树配置
    const clientAreaTreeConfig = {
      children: 'children',
      label: 'clientareaname',
    }

    onMounted(() => {
      getClientAreaList();
    })

    async function getClientAreaList() {
      clientAreaList.value = await clientAreaService.getClientAreaTree();
    }

    function focus() {
      ElSelectRef.value.focus();
    }

    return {
      ElSelectRef,
      clientAreaList,
      clientAreaTreeConfig,
      focus,
    };
  },
});
</script>
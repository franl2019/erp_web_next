<template>
  <el-tree-select
      :data="clientAreaSelectList"
      :props="clientAreaTreeConfig"
      check-strictly
      filterable
      node-key="clientareaid"
  />
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IClientArea} from "@/module/clientArea/clientArea";
import {ClientAreaService} from "@/module/clientArea/clientArea.service";

export default defineComponent({
  name: "ErpClientAreaHaveRootSelect",
  setup(_props,{expose}) {
    const ElSelectRef = ref();
    const clientAreaSelectList = ref<IClientArea[]>([]);
    const clientAreaService = new ClientAreaService();

    //客户地区树配置
    const clientAreaTreeConfig = {
      children: 'children',
      label: 'clientareaname',
    }

    onMounted(async () => {
      await getClientAreaListHaveRoot()
    })

    async function getClientAreaListHaveRoot() {
      clientAreaSelectList.value = await clientAreaService.getClientAreaTreeHaveRoot();
    }

    function focus() {
      ElSelectRef.value.focus();
    }

    expose({focus});

    return {
      ElSelectRef,
      clientAreaSelectList,
      clientAreaTreeConfig
    };
  },
});
</script>

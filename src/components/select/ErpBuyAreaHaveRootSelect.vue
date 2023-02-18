<template>
  <el-tree-select
      ref="elSelectRef"
      :data="buyAreaSelectList"
      :props="buyAreaTreeConfig"
      check-strictly
      filterable
      node-key="buyareaid"
      v-bind="$attrs"/>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";

export default defineComponent({
  name:"ErpBuyAreaHaveRootSelect",
  setup(_props,{expose}) {
    const buyAreaSelectList = ref<IBuyArea[]>();
    const buyAreaService = new BuyAreaService();

    const buyAreaTreeConfig = {
      children: 'children',
      label: 'buyareaname',
    }

    onMounted(async () => {
      const buyAreaList = await buyAreaService.getBuyAreas();
      buyAreaSelectList.value = buyAreaService.formatBuyAreaListToTreeDataHaveRoot(buyAreaList);
    })

    const elSelectRef = ref();

    function focus() {
      elSelectRef.value.focus();
    }

    expose({focus})

    return {
      buyAreaSelectList,
      buyAreaTreeConfig,
      elSelectRef,
    };
  },
});
</script>

<style scoped>

</style>
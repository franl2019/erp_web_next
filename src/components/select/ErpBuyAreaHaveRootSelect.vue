<template>
  <el-tree-select
      ref="ElSelectRef"
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
  expose:["focus"],
  setup() {
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

    const ElSelectRef = ref();

    function focus() {
      ElSelectRef.value.focus();
    }

    return {
      buyAreaSelectList,
      buyAreaTreeConfig,
      ElSelectRef,
      focus,
    };
  },
});
</script>

<style scoped>

</style>
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
  name:"ErpBuyAreaSelect",
  setup(_props,{expose}) {
    const buyAreaTreeConfig = {
      children: 'children',
      label: 'buyareaname',
    }

    //供应商地区选择Data
    const buyAreaSelectList = ref<IBuyArea[]>();
    const buyAreaService = new BuyAreaService();

    onMounted(async () => {
      buyAreaSelectList.value = await getBuyAreaList();
    })

    const elSelectRef = ref();

    function focus() {
      elSelectRef.value.focus();
    }

    expose({focus})

    async function getBuyAreaList() {
      const buyAreaList = await buyAreaService.getBuyAreas();
      return buyAreaService.formatBuyAreaListToTreeData(buyAreaList);
    }

    return {
      buyAreaTreeConfig,
      buyAreaSelectList,
      elSelectRef,
      focus,
    };
  },
});
</script>

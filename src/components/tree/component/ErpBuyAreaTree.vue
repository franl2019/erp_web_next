<template>
  <erp-tree ref="buyAreaTreeRef"
            :config="buyAreaTreeConfig"
            :data="buyAreaTreeData"
            :expand-all="true"
            :highlight-current="true"
            node-key="buyareaid"
            v-bind="$attrs"
  />
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IBuyAreaTree} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import ErpTree from "@/components/tree/ErpTree.vue";

export default defineComponent({
  name: "ErpBuyAreaTree",
  components: {ErpTree},
  setup(_prop, {expose}) {
    onMounted(() => {
      initData();
    })

    //供应商地区树data
    let buyAreaTreeData = ref<IBuyAreaTree[]>([]);

    //供应商地区树配置
    const buyAreaTreeConfig = {
      children: 'children',
      label: 'buyareaname',
    }

    //获取供应商地区数据
    async function getBuyArea() {
      //供应商地区服务
      const buyAreaService = new BuyAreaService();
      const buyAreaList = await buyAreaService.getBuyAreas();
      buyAreaTreeData.value = buyAreaService.formatBuyAreaListToTreeDataHaveRoot(buyAreaList)
    }

    //供应商地区树ref
    const buyAreaTreeRef = ref();

    //初始化数据
    async function initData() {
      await getBuyArea();
    }

    function getSelectedNode() {
      return buyAreaTreeRef.value.getSelectedNode()
    }

    function setSelectedNode() {
      return buyAreaTreeRef.value.setSelectedNode()
    }

    expose({initData,getSelectedNode,setSelectedNode});

    return {
      initData,
      buyAreaTreeRef,
      buyAreaTreeData,
      buyAreaTreeConfig,
    };
  },
});
</script>

<style scoped>

</style>
<template>
      <erp-tree
          ref="buyAreaTreeRef"
          :data="buyAreaTreeData"
          :props="buyAreaTreeConfig"
          node-key="buyareaid"
          :highlight-current="true"
          default-expand-all
          :expand-on-click-node="false"
          v-bind="$attrs"
      />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IBuyAreaTree} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import ErpTree from "@/components/tree/ErpTree.vue";
onMounted(()=>{
  initData();
})

//供应商地区树data
let buyAreaTreeData = ref<IBuyAreaTree[]>([]);

//供应商地区树配置
const buyAreaTreeConfig = {
  children: 'children',
  label: 'buyareaname',
}

//供应商地区服务
const buyAreaService = new BuyAreaService();
//获取供应商地区数据
async function getBuyArea() {
  const buyAreaList = await buyAreaService.getBuyAreas();
  buyAreaTreeData.value =  buyAreaService.formatBuyAreaListToTreeDataHaveRoot(buyAreaList)
}

//供应商地区树ref
const buyAreaTreeRef = ref();

//初始化数据
async function initData(buyareaid?: number) {
  await getBuyArea();
  if (buyareaid) {
    await buyAreaTreeRef.value.setCurrentKey(buyareaid);
    await buyAreaTreeRef.value.$emit('node-click', buyAreaTreeRef.value.getCurrentNode());
  }
}

defineExpose({initData});
</script>

<style scoped>

</style>
<template>
  <!--  <el-select v-bind="$attrs" placeholder="选择所属地区" ref="ElSelectRef">-->
  <!--    <el-option-->
  <!--        v-for="item in buyAreaSelectList"-->
  <!--        :key="item.buyareaid"-->
  <!--        :label="item.buyareaname"-->
  <!--        :value="item.buyareaid"-->
  <!--    >-->
  <!--    </el-option>-->
  <!--  </el-select>-->
  <el-tree-select
      v-bind="$attrs"
      :data="buyAreaSelectList"
      :props="buyAreaTreeConfig"
      node-key="buyareaid"
      check-strictly
      filterable
      ref="ElSelectRef"/>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";

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

const ElSelectRef = ref();

function focus() {
  ElSelectRef.value.focus();
}

defineExpose({focus});


async function getBuyAreaList() {
  const buyAreaList = await buyAreaService.getBuyAreas();
  return buyAreaService.formatBuyAreaListToTreeData(buyAreaList);
}
</script>

<style scoped>

</style>
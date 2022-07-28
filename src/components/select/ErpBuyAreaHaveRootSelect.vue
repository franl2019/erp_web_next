<template>
<!--  <el-select v-bind="$attrs" placeholder="选择上级地区" ref="ElSelectRef">-->
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
      ref="ElSelectRef"
  />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";

const buyAreaSelectList = ref<IBuyArea[]>();
const buyAreaService = new BuyAreaService();

const buyAreaTreeConfig = {
  children: 'children',
  label: 'buyareaname',
}

onMounted(async () => {
  const buyAreaList = await buyAreaService.getBuyAreas();
  buyAreaSelectList.value =  buyAreaService.formatBuyAreaListToTreeDataHaveRoot(buyAreaList);
})

const ElSelectRef = ref();
function focus() {
  ElSelectRef.value.focus();
}
defineExpose({focus});


</script>

<style scoped>

</style>
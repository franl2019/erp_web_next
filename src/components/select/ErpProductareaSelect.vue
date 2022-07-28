<template>
  <!--  <el-select v-bind="$attrs" placeholder="选择所属类别" ref="ElSelectRef">-->
  <!--    <el-option-->
  <!--        v-for="item in productAreaSelectList"-->
  <!--        :key="item.productareaid"-->
  <!--        :label="item.productareaname"-->
  <!--        :value="item.productareaid"-->
  <!--    >-->
  <!--    </el-option>-->
  <!--  </el-select>-->

  <el-tree-select
      :data="productAreaSelectList"
      :props="productAreaTreeConfig"
      node-key="productareaid"
      check-strictly
      filterable
  />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IProductArea} from "@/module/productArea/productArea";
import {ProductAreaService} from "@/module/productArea/productArea.service";

const ElSelectRef = ref();
//产品类别选择List
const productAreaSelectList = ref<IProductArea[]>();
//服务
const productAreaService = new ProductAreaService();
//产品类别树配置
const productAreaTreeConfig = {
  children: 'children',
  label: 'productareaname',
}

onMounted(async () => {
  await getProductAreaList();
})

function focus() {
  ElSelectRef.value.focus();
}

async function getProductAreaList() {
  productAreaSelectList.value = await productAreaService.getProductAreaTree();
}

defineExpose({focus});
</script>

<style scoped>

</style>
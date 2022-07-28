<template>
  <el-tree
      ref="productAreaTreeRef"
      :data="productAreaTreeData"
      :props="productAreaTreeConfig"
      node-key="productareaid"
      :highlight-current="true"
      :expand-on-click-node="false"
      default-expand-all
      v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IProductAreaTree} from "@/module/productArea/productArea";
import {ProductAreaService} from "@/module/productArea/productArea.service";

onMounted(async ()=>{
 await initData();
})

const props = withDefaults(defineProps<{
  haveRootNode?:boolean;
}>(),{haveRootNode:false})

//产品类别树配置
const productAreaTreeConfig = {
  children: 'children',
  label: 'productareaname',
}

//产品类别树ref
const productAreaTreeRef = ref();

//产品类别树data
let productAreaTreeData = ref<IProductAreaTree[]>([]);

//产品类别服务
const productAreaService = new ProductAreaService();

//获取产品类别数据
async function getProductArea() {
  if(props.haveRootNode){
    productAreaTreeData.value = await productAreaService.getProductAreaTreeHaveRootNode();
  }else{
    productAreaTreeData.value = await productAreaService.getProductAreaTree();
  }

}

async function initData(productareaid?: number) {
  await getProductArea();
  if (productareaid) {
    await productAreaTreeRef.value.setCurrentKey(productareaid);
    await productAreaTreeRef.value.$emit('node-click', productAreaTreeRef.value.getCurrentNode());
  }
}

defineExpose({initData})
</script>

<style scoped>

</style>
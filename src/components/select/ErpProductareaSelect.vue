<template>
  <erp-select-tree
      :data="productAreaSelectList"
      :expandOnClickNode="false"
      :model-value="props.modelValue"
      :props="productAreaTreeConfig"
      node-key="productareaid"
      v-bind="$attrs"/>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {IProductArea} from "@/module/productArea/productArea";
import {ProductAreaService} from "@/module/productArea/productArea.service";
import ErpSelectTree from "@/components/selectTree/ErpSelectTree.vue";

const props = withDefaults(defineProps<{
  modelValue?: any;
}>(), {})


const ElSelectRef = ref();
//产品类别选择List
const productAreaSelectList = ref<IProductArea[]>([]);
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
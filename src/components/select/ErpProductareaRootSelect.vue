<template>
  <el-tree-select
      :data="productAreaSelectList"
      :props="productAreaTreeConfig"
      check-strictly
      filterable
      node-key="productareaid"
  />
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IProductArea} from "@/module/productArea/productArea";
import {ProductAreaService} from "@/module/productArea/productArea.service";

export default defineComponent({
  name: "ErpProductareaRootSelect",
  setup(_props,{expose}) {
    const ElSelectRef = ref();
    const productAreaSelectList = ref<IProductArea[]>();
    const productAreaService = new ProductAreaService();

    //产品类别树配置
    const productAreaTreeConfig = {
      children: 'children',
      label: 'productareaname',
    }

    onMounted(async () => {
      productAreaSelectList.value = await productAreaService.getProductAreaTreeHaveRootNode();
    })

    function focus() {
      ElSelectRef.value.focus();
    }
    expose({focus});

    return {
      ElSelectRef,
      productAreaSelectList,
      productAreaTreeConfig,
    };
  },
});
</script>

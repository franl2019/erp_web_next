<template>
  <erp-tree ref="productAreaTreeRef"
            :config="productAreaTreeConfig"
            :data="productAreaTreeData"
            :expand-on-click-node="false"
            :highlight-current="true"
            default-expand-all
            node-key="productareaid"
            v-bind="$attrs"/>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {IProductAreaTree} from "@/module/productArea/productArea";
import {ProductAreaService} from "@/module/productArea/productArea.service";
import ErpTree from "@/components/tree/ErpTree.vue";

export default defineComponent({
  name: "ErpProductAreaTree",
  components: {
    ErpTree
  },
  props: {
    haveRootNode: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, {expose}) {
    onMounted(async () => {
      await initData();
    })

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
      if (props.haveRootNode) {
        productAreaTreeData.value = await productAreaService.getProductAreaTreeHaveRootNode();
      } else {
        productAreaTreeData.value = await productAreaService.getProductAreaTree();
      }

    }

    async function initData() {
      await getProductArea();
    }

    expose({initData});

    return {
      productAreaTreeConfig,
      productAreaTreeRef,
      productAreaTreeData,
      productAreaService,
      initData,
    };
  },
});
</script>

<style scoped>

</style>
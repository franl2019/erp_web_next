<template>
  <div class="flex flex-col h-full pr-2">
    <erp_title title="类别">
      <erp_button size="small" @click="createProductAreaDialogVisible = true">新增</erp_button>
      <erp_button size="small" v-if="productAreaId!==0" @click="updateProductAreaDialogVisible = true">修改</erp_button>
      <erp_button size="small" v-if="productAreaId!==0" type="danger" @click="onDeleteProductAreaBtn">删除</erp_button>
    </erp_title>
    <div class="flex-grow border-solid border border-gray-300 overflow-y-auto">
      <erp_product-area-tree
          ref="productAreaTreeRef"
          have-root-node
          @node-click="onClickProductAreaNode"
          :expand-on-click-node="false"
          :default-expand-all="true"
      ></erp_product-area-tree>
    </div>
  </div>
  <new-product-area-dialog
      v-if="createProductAreaDialogVisible"
      @ok="onNewProductAreaConfirm"
      @close="createProductAreaDialogVisible = false"
  ></new-product-area-dialog>

  <update-product-dialog
      v-if="updateProductAreaDialogVisible"
      :product-area="productArea"
      @ok="onUpdateProductAreaConfirm"
      @close="updateProductAreaDialogVisible = false">
  </update-product-dialog>

</template>

<script lang='ts' setup>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import {onMounted, ref} from "vue";
import ErpDialog from "@/components/dialog/dialog";
import NewProductAreaDialog from "@/view/productArea/NewProductAreaDialog.vue";
import UpdateProductDialog from "@/view/productArea/UpdateProductAreaDialog.vue";
import {ProductAreaService} from "@/module/productArea/productArea.service";
import {IProductArea, IProductAreaTree, ProductArea} from "@/module/productArea/productArea";
import Erp_productAreaTree from "@/components/tree/ErpProductAreaTree.vue";
import {valueName} from "@/config/valueName";

const emits = defineEmits(['onClickProductAreaNode'])

//产品类别树ref
const productAreaTreeRef = ref();
//产品类别新增dialog
let createProductAreaDialogVisible = ref(false);
//产品类别更新dialog
let updateProductAreaDialogVisible = ref(false);
//产品类别服务
const productAreaService = new ProductAreaService();

const productAreaId = ref<number>(0);
const productArea = ref<IProductArea>(new ProductArea());

function onClickProductAreaNode(productAreaItem: IProductAreaTree) {
  productAreaId.value = productAreaItem.productareaid;
  productArea.value = JSON.parse(JSON.stringify(productAreaItem));
  emits('onClickProductAreaNode',productAreaItem)
}

onMounted(async () => {
  await productAreaTreeRef.value.initData();
})

//新增供应商dialog确定事件
async function onNewProductAreaConfirm() {
  await productAreaTreeRef.value.initData();
  createProductAreaDialogVisible.value = false;
}

//更新产品类别dialog确定事件
async function onUpdateProductAreaConfirm() {
  await productAreaTreeRef.value.initData(productAreaId.value);
  updateProductAreaDialogVisible.value =false;
}

//删除产品类别显示dialog按钮
function onDeleteProductAreaBtn() {
  if (productArea.value.productareaid) {
    ErpDialog({
      title: `是否删除${valueName.product}类别`,
      message: `${valueName.product}类别编号:${productArea.value.productareacode},产品类别名:${productArea.value.productareaname}`,
      ok: async () => {
        await productAreaService.delete_data(productArea.value.productareaid);
        await productAreaTreeRef.value.initData();
        productAreaId.value = 0
      }
    })
  }
}


</script>
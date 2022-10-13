<template>
  <div class="flex flex-col flex-grow pr-2">
    <erp-title title="类别">
      <div class="flex h-10 space-x-1">
        <erp-button size="small" @click="createProductAreaDialogVisible = true">新增</erp-button>
        <erp-button v-if="productAreaId!==0" size="small" @click="onClickEditButton">修改</erp-button>
        <erp-button v-if="productAreaId!==0" size="small" type="danger" @click="onDeleteProductAreaBtn">删除
        </erp-button>
      </div>
    </erp-title>

    <div class="border-solid border border-gray-300 h-0 flex-grow overflow-y-auto">
      <erp-product-area-tree
          ref="productAreaTreeRef"
          :default-expand-all="true"
          :expand-on-click-node="false"
          :have-root-node="true"
          @node-click="onClickProductAreaNode">
      </erp-product-area-tree>
    </div>
  </div>
  <new-product-area-dialog
      v-if="createProductAreaDialogVisible"
      @close="createProductAreaDialogVisible = false"
      @ok="onNewProductAreaConfirm">
  </new-product-area-dialog>

  <update-product-dialog
      v-if="updateProductAreaDialogVisible"
      :product-area="productArea"
      @close="updateProductAreaDialogVisible = false"
      @ok="onUpdateProductAreaConfirm">
  </update-product-dialog>

</template>

<script lang='ts'>
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpProductAreaTree from "@/components/tree/component/ErpProductAreaTree.vue";
import NewProductAreaDialog from "@/view/productArea/component/NewProductAreaDialog.vue";
import UpdateProductDialog from "@/view/productArea/component/UpdateProductAreaDialog.vue";
import ErpDialog from "@/components/dialog/dialog";
import {defineComponent, onMounted, ref} from "vue";
import {ProductAreaService} from "@/module/productArea/productArea.service";
import {IProductArea, IProductAreaTree, ProductArea} from "@/module/productArea/productArea";
import {valueName} from "@/config/valueName";
import {ICreateProductAreaDto} from "@/module/productArea/dto/createProductArea.dto";
import {IUpdateProductAreaDto} from "@/module/productArea/dto/updateProductArea.dto";

export default defineComponent({
  name: "ProductAreaView",
  components: {
    ErpTitle,
    ErpButton,
    ErpProductAreaTree,
    NewProductAreaDialog,
    UpdateProductDialog
  },
  emits: ['onClickProductAreaNode'],
  setup(_props, {emit}) {
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
      emit('onClickProductAreaNode', productAreaItem)
    }

    onMounted(async () => {
      console.log(productAreaTreeRef.value)
    })

    //新增供应商dialog确定事件
    async function onNewProductAreaConfirm(value: ICreateProductAreaDto) {
      await productAreaService.create(value);
      await productAreaTreeRef.value.initData();
      createProductAreaDialogVisible.value = false;
    }

    function onClickEditButton() {
      const productAreaItem = productAreaTreeRef.value.getSelectedNode();
      if (productAreaItem && productAreaItem.productareaid !== 0) {
        productAreaId.value = productAreaItem.productareaid;
        productArea.value = JSON.parse(JSON.stringify(productAreaItem));
        updateProductAreaDialogVisible.value = true
      }
    }

    //更新产品类别dialog确定事件
    async function onUpdateProductAreaConfirm(value: IUpdateProductAreaDto) {
      await productAreaService.update(value);
      await productAreaTreeRef.value.initData();
      productAreaId.value = value.productareaid
      updateProductAreaDialogVisible.value = false;
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
          }
        })
      }
    }

    return {
      productAreaTreeRef,
      createProductAreaDialogVisible,
      updateProductAreaDialogVisible,
      productArea,
      productAreaId,
      onClickEditButton,
      onClickProductAreaNode,
      onNewProductAreaConfirm,
      onUpdateProductAreaConfirm,
      onDeleteProductAreaBtn,
    };
  },
});
</script>
<template>
  <erp-left-right-page-box>
    <template #left>
      <product-area @onClickProductAreaNode="onClickProductAreaNode"></product-area>
    </template>
    <template #right>
      <erp_title title="">
        <template v-slot:input>
          <erp-is-use-select v-model="findProductDto.useflag" class="md:w-28"
                             @change="onSearchProduct"></erp-is-use-select>
          <erp-warehouse-auth-select-have-root
              v-model="warehouseid"
              class="md:w-32"
              @change="onSearchProduct"
          ></erp-warehouse-auth-select-have-root>
          <erp_input_rounded v-model="findProductDto.search" :placeholder="'输入'+valueName.product+'名称搜索'"
                             class="md:w-52"
                             @keyup.enter="onSearchProduct">
          </erp_input_rounded>
          <erp_button @click="onSearchProduct">刷新</erp_button>
        </template>
        <erp_button v-if="buttonShowState.create" @click="onClickedCreateProductDialogCancelButton">新增</erp_button>
        <erp_button v-if="buttonShowState.edit" @click="onClickedEditDialog">修改</erp_button>
        <erp_button v-if="buttonShowState.level1review" type="success" @click="onClickedLevel1Review">审核</erp_button>
        <erp_button v-if="buttonShowState.un_level1review" type="danger" @click="onClickedUnLevel1Review">撤审
        </erp_button>
        <erp_button v-if="buttonShowState.level2review" type="success" @click="onClickedLevel2Review">财务审核</erp_button>
        <erp_button v-if="buttonShowState.un_level2review" type="danger" @click="onClickedUnLevel2Review">财务撤审
        </erp_button>
        <erp_button v-if="buttonShowState.delete_data" type="danger" @click="onClickedDelete">删除</erp_button>
      </erp_title>

      <erp_table ref="productTableRef"
                 :find-dto="findProductDto"
                 :getRowNodeId="getRowNodeId"
                 :table-state="defaultProductTableState"
                 @selection-changed="onSelectProductGridRow"
      ></erp_table>
    </template>
  </erp-left-right-page-box>

  <add-product-dialog
      v-if="isShowAddProductDialog"
      @onClickedCancel="onClickedCreateProductDialogCancelButton"
      @onClickedConfirm="onClickedCreateProductDialogConfirmButton"
  ></add-product-dialog>

  <edit-product-dialog
      v-if="isShowEditProductDialog"
      :product="productTableSelect"
      :clickedCancel="onClickedUpdateProductDialogCancelButton"
      :clickedConfirm="onClickedUpdateProductDialogConfirmButton">
  </edit-product-dialog>
</template>

<script lang='ts' setup>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {nextTick, onMounted, ref, watch} from "vue";
import type {ITableRef} from "@/components/table/type";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {getButtonState, IButtonState} from "@/composables/useInfoButtonState";
import ErpDialog from "@/components/dialog/dialog";
import {FindProductDto, IFindProductDto} from "@/module/product/dto/findProduct.dto";
import {IProduct, Product} from "@/module/product/product";
import {ProductService} from "@/module/product/product.service";
import {defaultProductTableState} from "@/view/product/tableConfig/defaultProductTableState";
import AddProductDialog from "@/view/product/component/addProductDialog.vue";
import EditProductDialog from "@/view/product/component/editProductDialog.vue";
import ErpIsUseSelect from "@/components/select/ErpIsUseSelect.vue";
import {valueName} from "@/config/valueName";
import ErpLeftRightPageBox from "@/components/page/ErpLeftRightPageBox.vue";
import ProductArea from "@/view/productArea/productArea.vue";
import {IProductAreaTree} from "@/module/productArea/productArea";
import {VerifyParamError} from "@/error/verifyParamError";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {UpdateProductDto} from "@/module/product/dto/updateProduct.dto";
import {IAddProductOtherUnitMxList} from "@/module/product/dto/createProduct.dto";

onMounted(async () => {
  setDefaultAllWarehouse()
  await productTableRef.value?.initTableData();
})


//控制dialog显示
const isShowAddProductDialog = ref(false);
const isShowEditProductDialog = ref(false);
//产品表格选择的产品资料
const productTableSelect = ref<IProduct>(new Product());
//产品表格组件ref
const productTableRef = ref<ITableRef>();
//查询产品资料Dto
const findProductDto = ref<IFindProductDto>(new FindProductDto());
//产品资料服务
const productService = new ProductService();
const {warehouseid, setDefaultAllWarehouse} = useWarehouseSelect(findProductDto)

//表格行id设置
function getRowNodeId(data: IProduct) {
  return data.productid
}

const buttonShowState = ref<IButtonState>(getButtonState());

//观察产品资料的选中
watch(productTableSelect, (value) => {
  //根据选中产品审核状态，更改按钮显示状态
  buttonShowState.value = getButtonState(value.level1review, value.level2review)
})

//根据产品ID选中列表行
function productIdSelectRow(id: number) {
  console.log(id)
  productTableRef.value?.getGridApi().getRowNode("" + id)?.setSelected(true);
}

function onClickProductAreaNode(productAreaItem: IProductAreaTree) {
  findProductDto.value.productareaid = productAreaItem.productareaid
  onSearchProduct();
}

//产品资料搜索框回车事件
function onSearchProduct() {
  productTableRef.value?.initTableData();
  buttonShowState.value = getButtonState()
}

//产品表格行点击事件
async function onSelectProductGridRow() {
  const product = await getSelected();
  buttonShowState.value = getButtonState(product.level1review, product.level2review)
}

function onClickedCreateProductDialogCancelButton() {
  isShowAddProductDialog.value = !isShowAddProductDialog.value;
}

async function onClickedCreateProductDialogConfirmButton(createProductDto: IAddProductOtherUnitMxList) {
  const result = await productService.create(createProductDto);
  isShowAddProductDialog.value = false;
  await productTableRef.value?.initTableData();
  await productIdSelectRow(result.createResult!.id)
}

//显示编辑产品dialog
async function onClickedEditDialog() {
  productTableSelect.value = await getSelected()
  isShowEditProductDialog.value = true;
}

function onClickedUpdateProductDialogCancelButton() {
  isShowEditProductDialog.value = false;
}

async function onClickedUpdateProductDialogConfirmButton(updateProductDto:UpdateProductDto) {
  isShowEditProductDialog.value = false;
  await productService.update(updateProductDto);
  await productTableRef.value?.initTableData();
  await nextTick()
  await productIdSelectRow(updateProductDto.productid)
}

async function getSelected() {
  const selectRows = productTableRef.value?.getGridApi().getSelectedRows()[0];
  if (selectRows) {
    return JSON.parse(JSON.stringify(selectRows)) as IProduct
  } else {
    return Promise.reject(new VerifyParamError('还未选中产品资料'))
  }
}

//点击审核按钮
async function onClickedLevel1Review() {
  const product = await getSelected();
  if (product.productid) {
    ErpDialog({
      title: "是否审核",
      message: `${valueName.product}编号:${product.productcode},${valueName.product}名称:${product.productname}`,
      ok: async () => {
        await productService.level1Review(product.productid);
        await productTableRef.value?.initTableData();
        productIdSelectRow(product.productid);
      }
    })
  }
}

//点击撤审按钮
async function onClickedUnLevel1Review() {
  const product = await getSelected();
  if (product.productid) {
    ErpDialog({
      title: "是否撤审",
      message: `${valueName.product}编号:${product.productcode},${valueName.product}名称:${product.productname}`,
      ok: async () => {
        const productid = product.productid;
        await productService.unLevel1Review(productid);
        await productTableRef.value?.initTableData();
        productIdSelectRow(productid);
      }
    })
  }
}

//点击财务审核按钮
async function onClickedLevel2Review() {
  const product = await getSelected();
  if (product.productid) {
    ErpDialog({
      title: "是否财务审核",
      message: `${valueName.product}编号:${product.productcode},${valueName.product}名称:${product.productname}`,
      ok: async () => {
        const productid = product.productid;
        await productService.level2Review(productid);
        await productTableRef.value?.initTableData();
        productIdSelectRow(productid);
      }
    })
  }
}

//点击撤销财务审核按钮
async function onClickedUnLevel2Review() {
  const product = await getSelected();
  if (product.productid) {
    ErpDialog({
      title: "是否撤销财务审核",
      message: `${valueName.product}编号:${product.productcode},${valueName.product}名称:${product.productname}`,
      ok: async () => {
        const productid = product.productid;
        await productService.unLevel2Review(productid);
        await productTableRef.value?.initTableData();
        productIdSelectRow(productid);
      }
    })
  }
}

//点击删除按钮事件
async function onClickedDelete() {
  const product = await getSelected();
  if (product.productid) {
    ErpDialog({
      title: "是否删除",
      message: `${valueName.product}编号: ${product.productcode},${valueName.product}名称: ${product.productname}`,
      ok: async () => {
        const productid = product.productid;
        await productService.delete_data(productid);
        await productTableRef.value?.initTableData();
        buttonShowState.value = getButtonState()
      }
    })
  }
}
</script>
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
          <erp_input_rounded v-model="findProductDto.search" class="md:w-52"
                             :placeholder="'输入'+valueName.product+'名称搜索'"
                             @keyup.enter="onSearchProduct">
          </erp_input_rounded>
          <erp_button @click="onSearchProduct">刷新</erp_button>
        </template>
        <erp_button v-if="buttonShowState.create" @click="onClickedAddDialog">新增</erp_button>
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
                 @selection-changed="onSelectRow"
      ></erp_table>
    </template>
  </erp-left-right-page-box>

  <add-product-dialog
      v-if="isShowAddProductDialog"
      :dto="createProductDto"
      @clickedCancel="onClickedAddDialog"
      @clickedConfirm="onClickedAdd"
  ></add-product-dialog>

  <edit-product-dialog
      v-if="isShowEditProductDialog"
      :update-product-dto="productTableSelect"
      @clickedCancel="onClickedEditDialog"
      @clickedConfirm="onClickedEdit">
  </edit-product-dialog>
</template>

<script lang='ts' setup>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {onMounted, ref, watch} from "vue";
import type {ITableRef} from "@/components/table/type";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {getButtonState, IButtonState} from "@/composables/useInfoButtonState";
import ErpDialog from "@/components/dialog/dialog";
import {FindProductDto, IFindProductDto} from "@/module/product/dto/findProduct.dto";
import {CreateProductDto, ICreateProductDto} from "@/module/product/dto/createProduct.dto";
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
const {warehouseid,setDefaultAllWarehouse} = useWarehouseSelect(findProductDto)

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
  productTableRef.value?.getGridApi().getRowNode("" + id)?.setSelected(true);
}

const createProductDto = ref<ICreateProductDto>(new CreateProductDto());

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
async function onSelectRow() {
  const product = await getSelected();
  buttonShowState.value = getButtonState(product.level1review,product.level2review)
}

//显示新增产品dialog
function onClickedAddDialog() {
  initCreateProductDto();
  isShowAddProductDialog.value = !isShowAddProductDialog.value;
}

//显示编辑产品dialog
async function onClickedEditDialog() {
  isShowEditProductDialog.value = !isShowEditProductDialog.value;
  productTableSelect.value = await getSelected()
}

function initCreateProductDto() {
  createProductDto.value = new CreateProductDto();
}

//点击新增按钮事件
async function onClickedAdd() {
  if (createProductDto.value) {
    await productService.create(createProductDto.value);
    productTableRef.value?.initTableData();
    initCreateProductDto();
    isShowAddProductDialog.value = !isShowAddProductDialog.value;
  }
}

async function getSelected(){
  const selectRows = productTableRef.value?.getGridApi().getSelectedRows()
  if(selectRows){
    return JSON.parse(JSON.stringify(selectRows[0])) as IProduct
  }else{
    return Promise.reject(new VerifyParamError('还未选中产品资料'))
  }
}

//点击修改按钮事件
async function onClickedEdit() {
  const product = await getSelected();
  if (product.productid) {
    await productService.update(productTableSelect.value);
    await productTableRef.value?.initTableData();
    isShowEditProductDialog.value = !isShowEditProductDialog.value;
    buttonShowState.value = getButtonState();
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
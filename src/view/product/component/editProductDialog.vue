<template>
  <erp-form-dialog
      :title="'修改'+valueName.product+'资料'"
      @clickedCancel="onClickedCancel"
      @clickedConfirm="onClickedConfirm"
  >
    <template v-slot:custom>
      <erp-tabs v-model="activeName" @onClickTabs="onClickTabs">
        <erp-tabs-pane label="必填信息" name="required">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp_form :px="true">
              <erp_form_item label-for-name='名称' lg-col="4" md-col="4">
                <erp-input-round ref="defaultInputFocusRef" v-model="updateProductDto.productname"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="类别" lg-col="4" md-col="4">
                <erp-productarea-select v-model="updateProductDto.productareaid"></erp-productarea-select>
              </erp_form_item>
              <erp_form_item label-for-name="规格" lg-col="4" md-col="4">
                <erp-input-round v-model="updateProductDto.spec"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="仓库" lg-col="4" md-col="4">
                <erp-warehouse-auth-select v-model="updateProductDto.warehouseid"></erp-warehouse-auth-select>
              </erp_form_item>
              <erp_form_item label-for-name="单位" lg-col="2" md-col="4">
                <erp-input-round v-model="updateProductDto.unit"></erp-input-round>
              </erp_form_item>
            </erp_form>
          </div>
        </erp-tabs-pane>
        <erp-tabs-pane label="选填信息" name="info">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp_form :px="true">
              <erp_form_item label-for-name="产品编号" lg-col="2" md-col="2">
                <erp-input-round v-model="updateProductDto.productcode"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="用料" lg-col="2" md-col="4">
                <erp-input-round v-model="updateProductDto.materials"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="包装单位" lg-col="2" md-col="4">
                <erp-input-round v-model="updateProductDto.packunit"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="包装数量" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.packqty"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="体积" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.m3"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="长度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.length"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="宽度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.width"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="高度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.height"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="是否使用" lg-col="2" md-col="2">
                <erp_checkbox_border v-model="updateProductDto.useflag">使用</erp_checkbox_border>
              </erp_form_item>
              <erp_form_item label-for-name="备注1" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark1"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注2" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark2"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注3" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark3"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注4" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark4"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注5" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark5"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注6" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark6"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注7" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark7"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注8" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark8"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注9" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark9"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注10" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark10"></erp-input-round>
              </erp_form_item>
            </erp_form>
          </div>
        </erp-tabs-pane>
        <erp-tabs-pane label="辅助单位" name="otherUnit">
          <div class="h-96 overflow-y-auto">
            <erp-table
                ref="productOtherUnitTableRef"
                :find-dto="productOtherUnitFindDto"
                :getRowNodeId="getRowNodeId"
                :table-state="createProductOtherMxTableConfig"
                class="h-full"
            >
            </erp-table>
          </div>
        </erp-tabs-pane>
      </erp-tabs>
    </template>
  </erp-form-dialog>
</template>

<script lang='ts' setup>
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {nextTick, onMounted, ref} from "vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import ErpProductareaSelect from "@/components/select/ErpProductareaSelect.vue";
import Erp_checkbox_border from "@/components/input/ErpCheckbox.vue";
import {valueName} from "@/config/valueName";
import ErpTable from "@/components/table/ErpTable.vue";
import {createProductOtherMxTableConfig} from "@/view/product/component/tableConfig/createProductOtherMxTableConfig";
import {ITableRef} from "@/components/table/type";
import {ProductOtherUnitFindDto} from "@/module/productOtherUnit/dto/productOtherUnitFind.dto";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";
import ErpTabs from "@/components/tabs/ErpTabs.vue";
import ErpTabsPane from "@/components/tabs/ErpTabsPane.vue";
import {UpdateProductDto} from "@/module/product/dto/updateProduct.dto";
import {IProduct} from "@/module/product/product";
import {ProductOtherUnitMxCreateDto} from "@/module/productOtherUnit/dto/productOtherUnitMxCreate.dto";

const props = defineProps<{
  product: IProduct;
  clickedConfirm: (updateProductDto: UpdateProductDto) => Promise<{}>;
  clickedCancel: () => void;
}>();


const productOtherUnitTableRef = ref<ITableRef>();
const productOtherUnitFindDto = ref(new ProductOtherUnitFindDto())
productOtherUnitFindDto.value.productid = props.product.productid
const defaultInputFocusRef = ref();


const updateProductDto = ref(new UpdateProductDto())

onMounted(() => {
  updateProductDto.value.productToUpdateProductDto(props.product);
  productOtherUnitTableRef.value?.initTableData();
  nextTick(() => {
    defaultInputFocusRef.value.getNode().focus();
  })
})

const activeName = ref('required');

function onClickTabs(name: string) {
  activeName.value = name
}

function getRowNodeId(data: IProductOtherUnit) {
  return data.productOtherUnitId
}

function getProductOtherUnitMx() {
  productOtherUnitTableRef.value!.getGridApi().forEachNode((rowNode) => {
    const productOtherUnitMx = rowNode.data;
    productOtherUnitMx.conversionRate = Number(productOtherUnitMx.conversionRate);
    productOtherUnitMx.productOtherUnitId = Number(productOtherUnitMx.productOtherUnitId);
    if (
        productOtherUnitMx.productOtherUnitId
        && !isNaN(productOtherUnitMx.productOtherUnitId)
        && productOtherUnitMx.conversionRate !== 1
        && productOtherUnitMx.conversionRate !== 0
    ) {
      const productOtherUnitMxCreateDto = new ProductOtherUnitMxCreateDto;
      productOtherUnitMxCreateDto.productOtherUnitId = productOtherUnitMx.productOtherUnitId
      productOtherUnitMxCreateDto.conversionRate = productOtherUnitMx.conversionRate
      updateProductDto.value.productOtherUnitMxList.push(productOtherUnitMxCreateDto);
    }
  })
}


async function onClickedConfirm() {
  productOtherUnitTableRef.value!.getGridApi().stopEditing();
  getProductOtherUnitMx()
  setTimeout(() => {
    props.clickedConfirm(updateProductDto.value);
  }, 200)
}

function onClickedCancel() {
  props.clickedCancel();
}

</script>

<style lang="scss" scoped>

</style>
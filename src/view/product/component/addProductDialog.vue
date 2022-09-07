<template>
  <erp_dialog_form
      :title="'新增'+valueName.product+'资料'"
      @clickedCancel="onClickedCancel"
      @clickedConfirm="onClickedConfirm"
  >
    <template v-slot:custom>
      <erp-tabs v-model="activeName" @onClickTabs="onClickTabs">
        <erp-tabs-pane label="必填信息" name="required">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp_form :px="true">
              <erp_form_item label-for-name='名称' lg-col="4" md-col="4">
                <erp-input-round ref="defaultInputFocusRef" v-model="createProductDto.productname"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="类别" lg-col="4" md-col="4">
                <erp_select_productarea v-model="createProductDto.productareaid"></erp_select_productarea>
              </erp_form_item>
              <erp_form_item label-for-name="规格" lg-col="4" md-col="4">
                <erp-input-round v-model="createProductDto.spec"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="仓库" lg-col="4" md-col="4">
                <erp-warehouse-auth-select v-model="createProductDto.warehouseid"></erp-warehouse-auth-select>
              </erp_form_item>
              <erp_form_item label-for-name="单位" lg-col="2" md-col="4">
                <erp-input-round v-model="createProductDto.unit"></erp-input-round>
              </erp_form_item>
            </erp_form>
          </div>
        </erp-tabs-pane>
        <erp-tabs-pane label="选填信息" name="info">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp_form :px="true">
              <erp_form_item label-for-name="产品编号" lg-col="2" md-col="2">
                <erp-input-round v-model="createProductDto.productcode"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="用料" lg-col="2" md-col="4">
                <erp-input-round v-model="createProductDto.materials"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="包装单位" lg-col="2" md-col="4">
                <erp-input-round v-model="createProductDto.packunit"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="包装数量" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.packqty"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="体积" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.m3"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="长度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.length"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="宽度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.width"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="高度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.height"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="是否使用" lg-col="2" md-col="2">
                <erp_checkbox_border v-model="createProductDto.useflag">使用</erp_checkbox_border>
              </erp_form_item>
              <erp_form_item label-for-name="备注1" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark1"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注2" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark2"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注3" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark3"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注4" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark4"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注5" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark5"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注6" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark6"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注7" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark7"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注8" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark8"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注9" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark9"></erp-input-round>
              </erp_form_item>
              <erp_form_item label-for-name="备注10" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark10"></erp-input-round>
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
                @cellValueChanged="productOtherUnitTableCellValueChanged"
            >
            </erp-table>
          </div>
        </erp-tabs-pane>
      </erp-tabs>
    </template>
  </erp_dialog_form>
</template>

<script lang='ts' setup>
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {nextTick, onMounted, ref} from "vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import Erp_select_productarea from "@/components/select/ErpProductareaSelect.vue";
import Erp_checkbox_border from "@/components/input/ErpCheckbox.vue";
import {valueName} from "@/config/valueName";
import ErpTable from "@/components/table/ErpTable.vue";
import {createProductOtherMxTableConfig} from "@/view/product/component/tableConfig/createProductOtherMxTableConfig";
import {ITableRef} from "@/components/table/type";
import {ProductOtherUnitFindDto} from "@/module/productOtherUnit/dto/productOtherUnitFind.dto";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";
import {CreateProductDto} from "@/module/product/dto/createProduct.dto";
import ErpTabs from "@/components/tabs/ErpTabs.vue";
import ErpTabsPane from "@/components/tabs/ErpTabsPane.vue";
import {CellValueChangedEvent} from "ag-grid-community";
import {ProductOtherUnitMxCreateDto} from "@/module/productOtherUnit/dto/productOtherUnitMxCreate.dto";


const createProductDto = ref(new CreateProductDto());
const productOtherUnitTableRef = ref<ITableRef>();
const productOtherUnitFindDto = ref(new ProductOtherUnitFindDto())
const defaultInputFocusRef = ref();

onMounted(async () => {
  productOtherUnitTableRef.value?.initTableData();
  await nextTick(() => {
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

const emits = defineEmits([
  'onClickedConfirm',
  'onClickedCancel'
])

function onClickedConfirm() {
   productOtherUnitTableRef.value?.getGridApi().stopEditing()
   setTimeout(()=>{
     emits('onClickedConfirm', createProductDto.value);
   },200)
}

function onClickedCancel() {
  emits('onClickedCancel')
}

function productOtherUnitTableCellValueChanged(event: CellValueChangedEvent) {
  if(event.data.productOtherUnitId !== 0 && !isNaN(event.data.productOtherUnitId)){
    const productOtherUnitMxCreateDto = new ProductOtherUnitMxCreateDto;
    productOtherUnitMxCreateDto.productOtherUnitId = Number(event.data.productOtherUnitId);
    productOtherUnitMxCreateDto.conversionRate = Number(event.data.conversionRate)
    createProductDto.value.productOtherUnitMxList.push(productOtherUnitMxCreateDto);
  }
}

</script>

<style lang="scss" scoped>

</style>
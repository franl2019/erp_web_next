<template>
  <erp-form-dialog
      :title="'新增' + valueName.product + '资料'"
      @clickedCancel="onClickedCancel"
      @clickedConfirm="onClickedConfirm">
    <template #custom>
      <erp-tabs v-model="activeName" @onClickTabs="onClickTabs">
        <erp-tabs-pane label="必填信息" name="required">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp-form :px="true">
              <erp-form-item name="名称" lg-col="4" md-col="4">
                <erp-input-round ref="defaultInputFocusRef" v-model="createProductDto.productname"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="类别" lg-col="4" md-col="4">
                <erp-select-productarea v-model="createProductDto.productareaid"></erp-select-productarea>
              </erp-form-item>
              <erp-form-item name="规格" lg-col="4" md-col="4">
                <erp-input-round v-model="createProductDto.spec"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="仓库" lg-col="4" md-col="4">
                <erp-warehouse-auth-select v-model="createProductDto.warehouseid"></erp-warehouse-auth-select>
              </erp-form-item>
              <erp-form-item name="单位" lg-col="2" md-col="4">
                <erp-input-round v-model="createProductDto.unit"></erp-input-round>
              </erp-form-item>
            </erp-form>
          </div>
        </erp-tabs-pane>
        <erp-tabs-pane label="选填信息" name="info">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp-form :px="true">
              <erp-form-item name="产品编号" lg-col="2" md-col="2">
                <erp-input-round v-model="createProductDto.productcode"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="用料" lg-col="2" md-col="4">
                <erp-input-round v-model="createProductDto.materials"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="包装单位" lg-col="2" md-col="4">
                <erp-input-round v-model="createProductDto.packunit"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="包装数量" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.packqty"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="体积" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.m3"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="长度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.length"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="宽度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.width"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="高度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="createProductDto.height"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="是否使用" lg-col="2" md-col="2">
                <erp-checkbox-border v-model="createProductDto.useflag">使用
                </erp-checkbox-border>
              </erp-form-item>
              <erp-form-item name="备注1" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark1"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注2" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark2"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注3" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark3"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注4" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark4"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注5" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark5"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注6" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark6"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注7" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark7"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注8" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark8"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注9" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark9"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注10" lg-col="8" md-col="8">
                <erp-input-round v-model="createProductDto.remark10"></erp-input-round>
              </erp-form-item>
            </erp-form>
          </div>
        </erp-tabs-pane>
        <erp-tabs-pane label="辅助单位" name="otherUnit">
          <div class="h-96">
            <erp-table
                ref="productOtherUnitTableRef"
                :find-dto="productOtherUnitFindDto"
                :getRowNodeId="getRowNodeId"
                :init="true"
                :table-state="createProductOtherMxTableConfig"
                class="h-96"
                @cellValueChanged="productOtherUnitTableCellValueChanged">
            </erp-table>
          </div>
        </erp-tabs-pane>
      </erp-tabs>
    </template>
  </erp-form-dialog>
</template>

<script lang="ts">
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import ErpSelectProductarea from "@/components/select/ErpProductareaSelect.vue";
import ErpCheckboxBorder from "@/components/input/ErpCheckbox.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpTabs from "@/components/tabs/ErpTabs.vue";
import ErpTabsPane from "@/components/tabs/ErpTabsPane.vue";
import {defineComponent, nextTick, onMounted, ref} from "vue";
import {valueName} from "@/config/valueName";
import {createProductOtherMxTableConfig} from "@/view/product/component/tableConfig/createProductOtherMxTableConfig";
import {ITableRef} from "@/components/table/type";
import {ProductOtherUnitFindDto} from "@/module/productOtherUnit/dto/productOtherUnitFind.dto";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";
import {CreateProductDto} from "@/module/product/dto/createProduct.dto";
import {CellValueChangedEvent} from "ag-grid-community";
import {ProductOtherUnitMxCreateDto} from "@/module/productOtherUnit/dto/productOtherUnitMxCreate.dto";

export default defineComponent({
  name: "AddProductDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpTable,
    ErpInputRound,
    ErpWarehouseAuthSelect,
    ErpFormDialog,
    ErpSelectProductarea,
    ErpCheckboxBorder,
    ErpTabs,
    ErpTabsPane
  },
  emits: ["onClickedConfirm", "onClickedCancel"],
  setup(_props, {emit}) {
    const createProductDto = ref(new CreateProductDto());
    const productOtherUnitTableRef = ref<ITableRef>();
    const productOtherUnitFindDto = ref(new ProductOtherUnitFindDto());
    const defaultInputFocusRef = ref();

    onMounted(async () => {
      await nextTick(() => {
        defaultInputFocusRef.value.getNode().focus();
      });
    });

    const activeName = ref("required");

    function onClickTabs(name: string) {
      activeName.value = name;
    }

    function getRowNodeId(data: IProductOtherUnit) {
      return data.productOtherUnitId;
    }

    function onClickedConfirm() {
      productOtherUnitTableRef.value?.getGridApi().stopEditing();
      setTimeout(() => {
        emit("onClickedConfirm", createProductDto.value);
      }, 200);
    }

    function onClickedCancel() {
      emit("onClickedCancel");
    }

    function productOtherUnitTableCellValueChanged(
        event: CellValueChangedEvent
    ) {
      if (
          event.data.productOtherUnitId !== 0 &&
          !isNaN(event.data.productOtherUnitId)
      ) {
        const productOtherUnitMxCreateDto = new ProductOtherUnitMxCreateDto();
        productOtherUnitMxCreateDto.productOtherUnitId = Number(
            event.data.productOtherUnitId
        );
        productOtherUnitMxCreateDto.conversionRate = Number(
            event.data.conversionRate
        );
        createProductDto.value.productOtherUnitMxList.push(
            productOtherUnitMxCreateDto
        );
      }
    }

    return {
      valueName,
      activeName,
      createProductDto,
      productOtherUnitFindDto,
      defaultInputFocusRef,
      productOtherUnitTableRef,
      createProductOtherMxTableConfig,
      onClickTabs,
      onClickedConfirm,
      onClickedCancel,
      getRowNodeId,
      productOtherUnitTableCellValueChanged,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>

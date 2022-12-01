<template>
  <erp-form-dialog :title="'修改'+valueName.product+'资料'" @clickedCancel="onClickedCancel"
                   @clickedConfirm="onClickedConfirm">
    <template v-slot:custom>
      <erp-tabs v-model="activeName" @onClickTabs="onClickTabs">
        <erp-tabs-pane label="必填信息" name="required">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp-form :px="true">
              <erp-form-item name='名称' lg-col="4" md-col="4">
                <erp-input-round ref="defaultInputFocusRef" v-model="updateProductDto.productname"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="类别" lg-col="4" md-col="4">
                <erp-productarea-select v-model="updateProductDto.productareaid"></erp-productarea-select>
              </erp-form-item>
              <erp-form-item name="规格" lg-col="4" md-col="4">
                <erp-input-round v-model="updateProductDto.spec"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="仓库" lg-col="4" md-col="4">
                <erp-warehouse-auth-select v-model="updateProductDto.warehouseid"></erp-warehouse-auth-select>
              </erp-form-item>
              <erp-form-item name="单位" lg-col="2" md-col="4">
                <erp-input-round v-model="updateProductDto.unit"></erp-input-round>
              </erp-form-item>
            </erp-form>
          </div>
        </erp-tabs-pane>
        <erp-tabs-pane label="选填信息" name="info">
          <div class="h-96 overflow-y-auto pt-1 pb-2">
            <erp-form :px="true">
              <erp-form-item name="产品编号" lg-col="2" md-col="2">
                <erp-input-round v-model="updateProductDto.productcode"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="用料" lg-col="2" md-col="4">
                <erp-input-round v-model="updateProductDto.materials"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="包装单位" lg-col="2" md-col="4">
                <erp-input-round v-model="updateProductDto.packunit"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="包装数量" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.packqty"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="体积" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.m3"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="长度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.length"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="宽度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.width"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="高度" lg-col="2" md-col="4">
                <erp-input-round v-model.number="updateProductDto.height"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="是否使用" lg-col="2" md-col="2">
                <erp-checkbox v-model="updateProductDto.useflag">使用</erp-checkbox>
              </erp-form-item>
              <erp-form-item name="备注1" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark1"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注2" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark2"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注3" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark3"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注4" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark4"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注5" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark5"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注6" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark6"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注7" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark7"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注8" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark8"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注9" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark9"></erp-input-round>
              </erp-form-item>
              <erp-form-item name="备注10" lg-col="8" md-col="8">
                <erp-input-round v-model="updateProductDto.remark10"></erp-input-round>
              </erp-form-item>
            </erp-form>
          </div>
        </erp-tabs-pane>
        <erp-tabs-pane label="辅助单位" name="otherUnit">
          <div class="h-96">
            <erp-table ref="productOtherUnitTableRef"
                       :find-dto="productOtherUnitFindDto"
                       :getRowNodeId="getRowNodeId"
                       :init="true"
                       :table-state="createProductOtherMxTableConfig"
                       class="h-96">
            </erp-table>
          </div>
        </erp-tabs-pane>
      </erp-tabs>
    </template>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpForm from "@/components/form/ErpForm.vue";
import ErpTabs from "@/components/tabs/ErpTabs.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpTabsPane from "@/components/tabs/ErpTabsPane.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpProductareaSelect from "@/components/select/ErpProductareaSelect.vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import {defineComponent, nextTick, onMounted, PropType, ref} from "vue";
import {valueName} from "@/config/valueName";
import {createProductOtherMxTableConfig} from "@/view/product/component/tableConfig/createProductOtherMxTableConfig";
import {ITableRef} from "@/components/table/type";
import {ProductOtherUnitFindDto} from "@/module/productOtherUnit/dto/productOtherUnitFind.dto";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";
import {UpdateProductDto} from "@/module/product/dto/updateProduct.dto";
import {IProduct} from "@/module/product/product";
import {ProductOtherUnitMxCreateDto} from "@/module/productOtherUnit/dto/productOtherUnitMxCreate.dto";

export default defineComponent({
  name: "EditProductDialog",
  components: {
    ErpTabs,
    ErpTabsPane,
    ErpTable,
    ErpForm,
    ErpFormItem,
    ErpCheckbox,
    ErpInputRound,
    ErpFormDialog,
    ErpProductareaSelect,
    ErpWarehouseAuthSelect
  },
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
    clickedConfirm: {
      type: Function as PropType<(updateProductDto: UpdateProductDto) => Promise<void>>,
      required: true,
    },
    clickedCancel: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    const productOtherUnitTableRef = ref<ITableRef>();
    const productOtherUnitFindDto = ref(new ProductOtherUnitFindDto())
    productOtherUnitFindDto.value.productid = props.product.productid
    const defaultInputFocusRef = ref();
    const updateProductDto = ref(new UpdateProductDto())

    onMounted(() => {
      updateProductDto.value.productToUpdateProductDto(props.product);
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

    return {
      valueName,
      activeName,
      updateProductDto,
      defaultInputFocusRef,
      createProductOtherMxTableConfig,
      productOtherUnitTableRef,
      productOtherUnitFindDto,
      onClickTabs,
      getRowNodeId,
      onClickedConfirm,
      onClickedCancel,
    };
  },
});
</script>

<style lang="scss" scoped>

</style>
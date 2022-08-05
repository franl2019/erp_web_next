<template>
  <erp_dialog_form v-bind="$attrs" :title="'编辑'+valueName.product+'资料'">
    <erp_form>

      <erp_form_item label-for-name="名称" type="danger" md-col="8" lg-col="8">
        <erp_input_rounded ref="defaultInputFocusRef" v-model="updateProductDto.productname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="规格" type="danger" md-col="4" lg-col="4">
        <erp_input_rounded v-model="updateProductDto.spec"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="用料" type="danger" md-col="4" lg-col="4">
        <erp_input_rounded v-model="updateProductDto.materials"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="类别" type="danger" md-col="4" lg-col="2">
       <erp_select_productarea v-model="updateProductDto.productareaid"></erp_select_productarea>
      </erp_form_item>
      <erp_form_item label-for-name="仓库" type="danger" md-col="4" lg-col="2">
        <erp-warehouse-auth-select v-model="updateProductDto.warehouseid"></erp-warehouse-auth-select>
      </erp_form_item>
      <erp_form_item label-for-name="单位" type="danger" md-col="4" lg-col="2">
        <erp_input_rounded v-model="updateProductDto.unit"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="包装单位" md-col="4" lg-col="2">
        <erp_input_rounded v-model="updateProductDto.packunit"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="包装数量" md-col="4" lg-col="2">
        <erp_input_rounded v-model.number="updateProductDto.packqty"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="体积" md-col="4" lg-col="2">
        <erp_input_rounded v-model.number="updateProductDto.m3"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="长度" md-col="4" lg-col="2">
        <erp_input_rounded v-model.number="updateProductDto.length"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="宽度" md-col="4" lg-col="2">
        <erp_input_rounded v-model.number="updateProductDto.width"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="高度" md-col="4" lg-col="2">
        <erp_input_rounded v-model.number="updateProductDto.height"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="是否使用" md-col="2" lg-col="2">
        <erp_checkbox_border v-model="updateProductDto.useflag">使用</erp_checkbox_border>
      </erp_form_item>
      <erp_form_item label-for-name='编号' md-col="2" lg-col="2">
        <erp_input_rounded  v-model="updateProductDto.productcode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注1" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark1"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注2" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark2"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注3" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark3"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注4" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark4"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注5" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark5"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注6" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark6"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注7" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark7"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注8" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark8"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注9" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark9"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注10" md-col="8" lg-col="8">
        <erp_input_rounded v-model="updateProductDto.remark10"></erp_input_rounded>
      </erp_form_item>
    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {onMounted, ref} from "vue";
import {IProduct} from "@/module/product/product";
import Erp_select_productarea from "@/components/select/ErpProductareaSelect.vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import Erp_checkbox_border from "@/components/input/ErpCheckbox.vue";
import {valueName} from "@/config/valueName";

const props = defineProps<{
  updateProductDto: IProduct
}>()
const defaultInputFocusRef = ref();
onMounted(async () => {
  defaultInputFocusRef.value.getNode().focus();
})


</script>
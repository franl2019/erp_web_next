<template>
  <erp_dialog_form :title="'新增'+valueName.product+'资料'" v-bind="$attrs">
    <erp_form>
      <erp_form_item label-for-name='名称' lg-col="4" md-col="4" type="danger">
        <erp_input_rounded ref="defaultInputFocusRef" v-model="dto.productname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="类别" lg-col="4" md-col="4" type="danger">
        <erp_select_productarea v-model="dto.productareaid"></erp_select_productarea>
      </erp_form_item>
      <erp_form_item label-for-name="规格" lg-col="4" md-col="4" type="danger">
        <erp_input_rounded v-model="dto.spec"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="用料" lg-col="4" md-col="4" type="danger">
        <erp_input_rounded v-model="dto.materials"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="仓库" lg-col="2" md-col="4" type="danger">
        <erp-warehouse-auth-select v-model="dto.warehouseid"></erp-warehouse-auth-select>
      </erp_form_item>
      <erp_form_item label-for-name="单位" lg-col="2" md-col="4" type="danger">
        <erp_input_rounded v-model="dto.unit"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="包装单位" lg-col="2" md-col="4">
        <erp_input_rounded v-model="dto.packunit"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="包装数量" lg-col="2" md-col="4">
        <erp_input_rounded v-model.number="dto.packqty"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="体积" lg-col="2" md-col="4">
        <erp_input_rounded v-model.number="dto.m3"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="长度" lg-col="2" md-col="4">
        <erp_input_rounded v-model.number="dto.length"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="宽度" lg-col="2" md-col="4">
        <erp_input_rounded v-model.number="dto.width"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="高度" lg-col="2" md-col="4">
        <erp_input_rounded v-model.number="dto.height"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="是否使用" lg-col="2" md-col="2">
        <erp_checkbox_border v-model="dto.useflag">使用</erp_checkbox_border>
      </erp_form_item>
      <erp_form_item label-for-name="产品编号" lg-col="2" md-col="2">
        <erp_input_rounded v-model="dto.productcode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注1" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark1"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注2" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark2"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注3" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark3"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注4" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark4"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注5" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark5"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注6" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark6"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注7" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark7"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注8" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark8"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注9" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark9"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注10" lg-col="8" md-col="8">
        <erp_input_rounded v-model="dto.remark10"></erp_input_rounded>
      </erp_form_item>

    </erp_form>
  </erp_dialog_form>
</template>

<script lang='ts' setup>
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {onMounted, ref} from "vue";
import {ICreateProductDto} from "@/module/product/dto/createProduct.dto";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import Erp_select_productarea from "@/components/select/ErpProductareaSelect.vue";
import Erp_checkbox_border from "@/components/input/ErpCheckbox.vue";
import {valueName} from "@/config/valueName";

const props = defineProps<{
  dto: ICreateProductDto
}>()
const defaultInputFocusRef = ref();
const radioSelect = ref('基本信息')
onMounted(async () => {
  defaultInputFocusRef.value.getNode().focus();
})


</script>
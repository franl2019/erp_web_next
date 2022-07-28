<template>
  <erp_dialog_form v-bind="$attrs" title="修改客户资料">
    <erp_form>
      <erp_form_item label-for-name="客户名称" type="danger" md-col="4" lg-col="4">
        <erp_input_rounded ref="defaultInputFocus" v-model="dto.clientname"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="客户地区" type="danger" md-col="4" lg-col="4">
        <erp_select_clientarea v-model="dto.clientareaid"></erp_select_clientarea>
      </erp_form_item>
      <erp_form_item label-for-name="操作区域" type="danger" md-col="4" lg-col="2">
        <erp_select_operatearea v-model="dto.operateareaid"></erp_select_operatearea>
      </erp_form_item>
      <erp_form_item label-for-name="币种" type="danger" md-col="4" lg-col="2">
        <erp_select_currency v-model="dto.currencyid"></erp_select_currency>
      </erp_form_item>
      <erp_form_item label-for-name="结算方式" md-col="4" lg-col="2">
        <erp_input_rounded v-model="dto.moneytype"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="客户折扣" md-col="4" lg-col="2">
        <erp_input_rounded v-model.number="dto.discount"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="联系人" md-col="4" lg-col="2">
        <erp_input_rounded v-model="dto.contactperson"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="销售名称" md-col="4" lg-col="2">
        <erp_input_rounded v-model="dto.salesman"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="业务员" md-col="4" lg-col="2">
        <erp_input_rounded v-model="dto.ymrep"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="手机号码" md-col="4" lg-col="2">
        <erp_input_rounded v-model="dto.phone_no"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="电话号码" md-col="4" lg-col="2">
        <erp_input_rounded v-model="dto.tel_no"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="电子邮箱" md-col="4" lg-col="2">
        <erp_input_rounded v-model="dto.email"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="是否使用" md-col="2" lg-col="2">
        <erp_checkbox_border v-model="dto.useflag">使用</erp_checkbox_border>
      </erp_form_item>
      <erp_form_item label-for-name="客户编号" md-col="2" lg-col="2">
        <erp_input_rounded  v-model="dto.clientcode"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="地址" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.address"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注1" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark1"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注2" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark2"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注3" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark3"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注4" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark4"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注5" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark5"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注6" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark6"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注7" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark7"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注8" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark8"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注9" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark9"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="备注10" md-col="8" lg-col="8">
        <erp_input_rounded v-model="dto.remark10"></erp_input_rounded>
      </erp_form_item>
      <erp_form_item label-for-name="公司标记" md-col="2" lg-col="2">
        <erp_checkbox_border v-model="dto.gs">公司</erp_checkbox_border>
      </erp_form_item>

    </erp_form>
  </erp_dialog_form>
</template>

<script setup lang='ts'>
import Erp_dialog_form from "@/components/dialog/ErpFormDialog.vue";
import Erp_form from "@/components/form/ErpForm.vue";
import Erp_form_item from "@/components/form/ErpFormItem.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import {IClient} from "@/module/client/client";
import {onMounted, ref} from "vue";
import Erp_select_clientarea from "@/components/select/ErpClientAreaSelect.vue";
import Erp_select_operatearea from "@/components/select/ErpOperateareaSelect.vue";
import Erp_select_currency from "@/components/select/ErpCurrencySelect.vue";
import Erp_checkbox_border from "@/components/input/ErpCheckbox.vue";

const props = defineProps<{
  dto: IClient;
}>()
const defaultInputFocus = ref();

onMounted(async () => {
  defaultInputFocus.value.getNode().focus();
})

</script>
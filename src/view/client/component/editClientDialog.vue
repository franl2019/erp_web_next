<template>
  <erp-form-dialog title="修改客户资料" v-bind="$attrs">
    <erp-form>
      <erp-form-item name="客户名称" lg-col="4" md-col="4" type="danger">
        <erp-input-round ref="defaultInputFocus" v-model="dto.clientname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="客户地区" lg-col="4" md-col="4" type="danger">
        <erp-client-area-select v-model="dto.clientareaid"></erp-client-area-select>
      </erp-form-item>
      <erp-form-item name="操作区域" lg-col="2" md-col="4" type="danger">
        <erp-operatearea-select v-model="dto.operateareaid"></erp-operatearea-select>
      </erp-form-item>
      <erp-form-item name="币种" lg-col="2" md-col="4" type="danger">
        <erp-currency-select v-model="dto.currencyid"></erp-currency-select>
      </erp-form-item>
      <erp-form-item name="结算方式" lg-col="2" md-col="4">
        <erp-input-round v-model="dto.moneytype"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="客户折扣" lg-col="2" md-col="4">
        <erp-input-round v-model.number="dto.discount"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="联系人" lg-col="2" md-col="4">
        <erp-input-round v-model="dto.contactperson"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="销售名称" lg-col="2" md-col="4">
        <erp-input-round v-model="dto.salesman"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="业务员" lg-col="2" md-col="4">
        <erp-input-round v-model="dto.ymrep"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="手机号码" lg-col="2" md-col="4">
        <erp-input-round v-model="dto.phone_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="电话号码" lg-col="2" md-col="4">
        <erp-input-round v-model="dto.tel_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="电子邮箱" lg-col="2" md-col="4">
        <erp-input-round v-model="dto.email"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="是否使用" lg-col="2" md-col="2">
        <erp-checkbox v-model="dto.useflag">使用</erp-checkbox>
      </erp-form-item>
      <erp-form-item name="客户编号" lg-col="2" md-col="2">
        <erp-input-round v-model="dto.clientcode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="地址" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.address"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注1" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark1"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注2" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark2"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注3" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark3"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注4" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark4"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注5" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark5"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注6" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark6"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注7" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark7"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注8" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark8"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注9" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark9"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注10" lg-col="8" md-col="8">
        <erp-input-round v-model="dto.remark10"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="公司标记" lg-col="2" md-col="2">
        <erp-checkbox v-model="dto.gs">公司</erp-checkbox>
      </erp-form-item>

    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpClientAreaSelect from "@/components/select/ErpClientAreaSelect.vue";
import ErpOperateareaSelect from "@/components/select/ErpOperateareaSelect.vue";
import ErpCurrencySelect from "@/components/select/ErpCurrencySelect.vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";
import {IClient} from "@/module/client/client";
import {defineComponent, onMounted, PropType, ref} from "vue";

export default defineComponent({
  name: "editClientDialog",
  components: {
    ErpCheckbox,
    ErpCurrencySelect,
    ErpOperateareaSelect,
    ErpClientAreaSelect,
    ErpInputRound,
    ErpFormItem,
    ErpForm,
    ErpFormDialog
  },
  props: {
    dto: {
      type: Object as PropType<IClient>,
      required: true,
    },
  },
  setup() {
    const defaultInputFocus = ref();
    onMounted(async () => {
      defaultInputFocus.value.getNode().focus();
    })
    return {
      defaultInputFocus,
    };
  },
});
</script>
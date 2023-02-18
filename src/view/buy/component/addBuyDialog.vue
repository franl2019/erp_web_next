<template>
  <erp-form-dialog title="新增供应商" v-bind="$attrs">
    <erp-form>
      <erp-form-item name="名称" lg-col="4" md-col="4" type="danger">
        <erp-input-round ref="defaultInputFocusRef" v-model="addBuyDto.buyname"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="地区" lg-col="4" md-col="4" type="danger">
        <erp-select-buy-area v-model="addBuyDto.buyareaid"></erp-select-buy-area>
      </erp-form-item>
      <erp-form-item name="结算方式" lg-col="2" md-col="4">
        <erp-input-round v-model="addBuyDto.moneytype"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="联系人" lg-col="2" md-col="4">
        <erp-input-round v-model="addBuyDto.contactperson"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="销售名称" lg-col="2" md-col="4">
        <erp-input-round v-model="addBuyDto.salesman"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="业务员" lg-col="2" md-col="4">
        <erp-input-round v-model="addBuyDto.ymrep"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="手机号码" lg-col="2" md-col="4">
        <erp-input-round v-model="addBuyDto.phone_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="电话号码" lg-col="2" md-col="4">
        <erp-input-round v-model="addBuyDto.tel_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="电子邮箱" lg-col="4" md-col="4">
        <erp-input-round v-model="addBuyDto.email"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="地址" lg-col="8" md-col="8">
        <erp-input-round v-model="addBuyDto.address"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注1" lg-col="8" md-col="8">
        <erp-input-round v-model="addBuyDto.remark1"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="备注2" lg-col="8" md-col="8">
        <erp-input-round v-model="addBuyDto.remark2"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="编号" lg-col="2" md-col="2">
        <erp-input-round v-model="addBuyDto.buycode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="是否使用" lg-col="2" md-col="2">
        <erp-checkbox v-model="addBuyDto.useflag">使用</erp-checkbox>
      </erp-form-item>
      <erp-form-item name="操作区域" lg-col="2" md-col="4">
        <erp-operate-area-select v-model="addBuyDto.operateareaid" :operateareatype="1"></erp-operate-area-select>
      </erp-form-item>
      <erp-form-item name="应付类型" lg-col="2" md-col="4">
        <erp-accounts-payable-select v-model="addBuyDto.accountspayabletype"></erp-accounts-payable-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpSelectBuyArea from "@/components/select/ErpBuyAreaSelect.vue";
import ErpOperateAreaSelect from "@/components/select/ErpOperateareaSelect.vue";
import ErpAccountsPayableSelect from "@/components/select/ErpAccountsPayableTypeSelect.vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";
import {defineComponent, onMounted, PropType, ref} from "vue";
import {ICreateBuyDto} from "@/module/buy/dto/createBuy.dto";

export default defineComponent({
  name: "addBuyDialog",
  components: {
    ErpForm,
    ErpFormItem,
    ErpCheckbox,
    ErpFormDialog,
    ErpInputRound,
    ErpSelectBuyArea,
    ErpOperateAreaSelect,
    ErpAccountsPayableSelect,
  },
  props: {
    addBuyDto: {
      type: Object as PropType<ICreateBuyDto>,
      required: true,
    },
  },
  setup() {
    const defaultInputFocusRef = ref();

    onMounted(async () => {
      defaultInputFocusRef.value.getNode().focus();
    })

    return {
      defaultInputFocusRef,
    };
  },
});
</script>
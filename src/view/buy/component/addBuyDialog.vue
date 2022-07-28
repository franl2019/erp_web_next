<template>
  <erp-form-dialog v-bind="$attrs" title="新增供应商">
    <erp-form>

      <erp-form-item label-for-name="名称" type="danger" md-col="4" lg-col="4">
        <erp-input-round ref="defaultInputFocusRef" v-model="addBuyDto.buyname"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="地区" type="danger" md-col="4" lg-col="4">
        <erp-select-buy-area v-model="addBuyDto.buyareaid"></erp-select-buy-area>
      </erp-form-item>


      <erp-form-item label-for-name="结算方式" md-col="4" lg-col="2">
        <erp-input-round v-model="addBuyDto.moneytype"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="联系人" md-col="4" lg-col="2">
        <erp-input-round v-model="addBuyDto.contactperson"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="销售名称" md-col="4" lg-col="2">
        <erp-input-round v-model="addBuyDto.salesman"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="业务员" md-col="4" lg-col="2">
        <erp-input-round v-model="addBuyDto.ymrep"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="手机号码" md-col="4" lg-col="2">
        <erp-input-round v-model="addBuyDto.phone_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="电话号码" md-col="4" lg-col="2">
        <erp-input-round v-model="addBuyDto.tel_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="电子邮箱" md-col="4" lg-col="4">
        <erp-input-round v-model="addBuyDto.email"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="地址" md-col="8" lg-col="8">
        <erp-input-round v-model="addBuyDto.address"></erp-input-round>
      </erp-form-item>

      <erp-form-item label-for-name="备注1" md-col="8" lg-col="8">
        <erp-input-round v-model="addBuyDto.remark1"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="备注2" md-col="8" lg-col="8">
        <erp-input-round v-model="addBuyDto.remark2"></erp-input-round>
      </erp-form-item>
<!--      <erp-form-item label-for-name="备注3" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark3"></erp-input-round>-->
<!--      </erp-form-item>-->
<!--      <erp-form-item label-for-name="备注4" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark4"></erp-input-round>-->
<!--      </erp-form-item>-->
<!--      <erp-form-item label-for-name="备注5" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark5"></erp-input-round>-->
<!--      </erp-form-item>-->
<!--      <erp-form-item label-for-name="备注6" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark6"></erp-input-round>-->
<!--      </erp-form-item>-->
<!--      <erp-form-item label-for-name="备注7" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark7"></erp-input-round>-->
<!--      </erp-form-item>-->
<!--      <erp-form-item label-for-name="备注8" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark8"></erp-input-round>-->
<!--      </erp-form-item>-->
<!--      <erp-form-item label-for-name="备注9" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark9"></erp-input-round>-->
<!--      </erp-form-item>-->
<!--      <erp-form-item label-for-name="备注10" md-col="8" lg-col="8">-->
<!--        <erp-input-round v-model="addBuyDto.remark10"></erp-input-round>-->
<!--      </erp-form-item>-->
      <erp-form-item label-for-name="编号" md-col="2" lg-col="2">
        <erp-input-round v-model="addBuyDto.buycode"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="是否使用" md-col="2" lg-col="2">
        <erp-checkbox v-model="addBuyDto.useflag">使用</erp-checkbox>
      </erp-form-item>
      <erp-form-item label-for-name="操作区域" md-col="4" lg-col="2">
        <erp-operate-area-select v-model="addBuyDto.operateareaid" :operateareatype="1"></erp-operate-area-select>
      </erp-form-item>
      <erp-form-item label-for-name="应付类型" md-col="4" lg-col="2">
        <erp-accounts-payable-select v-model="addBuyDto.accountspayabletype"></erp-accounts-payable-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script setup lang='ts'>
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {onMounted, ref} from "vue";
import {ICreateBuyDto} from "@/module/buy/dto/createBuy.dto";
import ErpSelectBuyArea from "@/components/select/ErpBuyAreaSelect.vue";
import ErpOperateAreaSelect from "@/components/select/ErpOperateareaSelect.vue";
import ErpAccountsPayableSelect from "@/components/select/ErpAccountsPayableTypeSelect.vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";

const props = defineProps<{
  addBuyDto: ICreateBuyDto;
}>()
const defaultInputFocusRef = ref();
onMounted(async () => {
  defaultInputFocusRef.value.getNode().focus();
})

</script>
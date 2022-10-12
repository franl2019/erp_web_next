<template>
  <erp-form-dialog title="编辑供应商" v-bind="$attrs">
    <erp-form>
      <erp-form-item label-for-name="名称" lg-col="4" md-col="4" type="danger">
        <erp-input-round ref="defaultInputFocusRef" v-model="updateBuyDto.buyname"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="地区" lg-col="4" md-col="4" type="danger">
        <erp-select-buy-area v-model="updateBuyDto.buyareaid"></erp-select-buy-area>
      </erp-form-item>
      <erp-form-item label-for-name="结算方式" lg-col="2" md-col="4">
        <erp-input-round v-model="updateBuyDto.moneytype"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="联系人" lg-col="2" md-col="4">
        <erp-input-round v-model="updateBuyDto.contactperson"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="销售" lg-col="2" md-col="4">
        <erp-input-round v-model="updateBuyDto.salesman"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="业务员" lg-col="2" md-col="4">
        <erp-input-round v-model="updateBuyDto.ymrep"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="手机" lg-col="2" md-col="4">
        <erp-input-round v-model="updateBuyDto.phone_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="电话" lg-col="2" md-col="4">
        <erp-input-round v-model="updateBuyDto.tel_no"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="邮箱" lg-col="4" md-col="4">
        <erp-input-round v-model="updateBuyDto.email"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="地址" lg-col="8" md-col="8">
        <erp-input-round v-model="updateBuyDto.address"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="备注1" lg-col="8" md-col="8">
        <erp-input-round v-model="updateBuyDto.remark1"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="备注2" lg-col="8" md-col="8">
        <erp-input-round v-model="updateBuyDto.remark2"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="编号" lg-col="2" md-col="2">
        <erp-input-round v-model="updateBuyDto.buycode"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="是否使用" lg-col="2" md-col="2">
        <erp-checkbox v-model="updateBuyDto.useflag">使用</erp-checkbox>
      </erp-form-item>
      <erp-form-item label-for-name="操作区域" lg-col="2" md-col="4">
        <erp-operate-area-select v-model="updateBuyDto.operateareaid" :operateareatype="1"></erp-operate-area-select>
      </erp-form-item>
      <erp-form-item label-for-name="应付类型" lg-col="2" md-col="4">
        <erp-accounts-payable-select v-model="updateBuyDto.accountspayabletype"></erp-accounts-payable-select>
      </erp-form-item>
    </erp-form>
  </erp-form-dialog>
</template>

<script lang='ts'>
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpCheckbox from "@/components/input/ErpCheckbox.vue";
import ErpFormDialog from "@/components/dialog/ErpFormDialog.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpSelectBuyArea from "@/components/select/ErpBuyAreaSelect.vue";
import ErpOperateAreaSelect from "@/components/select/ErpOperateareaSelect.vue";
import ErpAccountsPayableSelect from "@/components/select/ErpAccountsPayableTypeSelect.vue";
import {defineComponent, onMounted, PropType, ref} from "vue";
import {IOperatearea, OperateareaService} from "@/module/operatearea/operatearea.service";
import {BuyAreaService} from "@/module/buyArea/buyArea.service";
import {IBuyArea} from "@/module/buyArea/buyArea";
import {IBuy} from "@/module/buy/buy";
import {FindOperateareaDto} from "@/module/operatearea/dto/findOperatearea.dto";

export default defineComponent({
  name: "editBuyDialog",
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
    updateBuyDto: {
      type: Object as PropType<IBuy>,
      required: true,
    },
  },
  setup() {
    const defaultInputFocusRef = ref();
    onMounted(() => {
      defaultInputFocusRef.value.getNode().focus();
      getBuyAreaList();
      getOperateareaList();
    })

    //供应商地区选择Data
    const buyAreaSelectList = ref<IBuyArea[]>();
    //操作区域选择Data
    const operateareaSelectList = ref<IOperatearea[]>([]);
    //应付账款选择Data
    const accountspayabletypeSelectList = ref([{
      accountspayabletypeid: 0,
      accountspayabletypename: "应付账款"
    }]);
    const buyAreaService = new BuyAreaService();
    const operateareaService = new OperateareaService();


    async function getBuyAreaList() {
      buyAreaSelectList.value = await buyAreaService.getBuyAreas();
    }

    async function getOperateareaList() {
      const findOperateareaDto = new FindOperateareaDto();
      findOperateareaDto.operateareatype = 1;
      operateareaSelectList.value = await operateareaService.findAll(findOperateareaDto);
    }

    return {
      defaultInputFocusRef,
      buyAreaSelectList,
      operateareaSelectList,
      accountspayabletypeSelectList,
    };
  },
});
</script>
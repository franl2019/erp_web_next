<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button :disabled="!state.edit" type="info" @click="clickedSaveButton">保存</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteData">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedL1Review">审核</erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnL1Review">撤审
      </erp-button>
      <erp-button :disabled="!buttonShowState.level2review" type="success" @click="clickedL2Review">财审</erp-button>
      <erp-button :disabled="!buttonShowState.un_level2review" type="danger" @click="clickedUnL2Review">财务撤审
      </erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!state.edit" @click="clickedAddOutboundMxButton">选择库存</erp-button>
      <erp-button :disabled="!state.edit" type="danger" @click="clickedDeleteOutboundMxButton">删除明细</erp-button>
    </erp-no-title>

    <erp-form>
      <erp-form-item v-if="outboundHead.outboundcode" label-for-name="单号" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.outboundcode" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="客户" md-col="2" lg-col="2">
        <erp-select-client-btn @select="selectedClientEvent" @unSelect="unSelectedClientEvent"
                               :clientname="outboundHead.clientname" :disabled="!state.edit"></erp-select-client-btn>
      </erp-form-item>
      <erp-form-item label-for-name="仓库" md-col="2" lg-col="1">
        <erp-warehouse-auth-select v-model="outboundHead.warehouseid" :disabled="!state.edit" @change="unSelectWarehouse"></erp-warehouse-auth-select>
      </erp-form-item>
      <erp-form-item label-for-name="出仓日期" md-col="2" lg-col="1">
        <el-date-picker v-model="outboundHead.outdate" type="date" value-format="YYYY-MM-DD HH:mm:ss"
                        placeholder="选择出仓日期" :disabled="!state.edit"></el-date-picker>
      </erp-form-item>
      <erp-form-item label-for-name="相关号码" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.relatednumber" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="结算方式" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.moneytype" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="备注" md-col="2" lg-col="1">
        <erp-input-round v-model="outboundHead.remark1" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-table ref="outboundMxTableRef"
               :table-state="createOutboundMxTable"
               :table-edit="state.edit"
               :find-dto="{}"
               :getRowNodeId="getRowNodeId"
               @cellValueChanged="cellValueChangedEvent"
               @cellEditingStarted="cellEditingStartedEvent"
    ></erp-table>

  </erp-page-box>
</template>

<script setup lang='ts'>
import {onMounted, ref} from "vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpWarehouseAuthSelect from "@/components/select/ErpWarehouseAuthSelect.vue";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import {createOutboundMxTable} from "@/view/saleOutbound/tableConfig/createOutboundMxTable";
import {ITableRef} from "@/components/table/type";
import {
  saleOutboundOption,
  useSaleOutboundEditViewHock
} from "@/module/saleOutbound/hock/editView/useSaleOutboundEditViewHock";
import {useSaleOutboundEditViewEvent} from "@/module/saleOutbound/hock/editView/useSaleOutboundEditViewEvent";
import {ISaleOutboundFindTable, SaleOutboundFindTable} from "@/module/saleOutbound/outboundSale";
import {useRoute} from "vue-router";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {useButtonState} from "@/composables/useButtonState";

const route = useRoute();
//单据明细表格Ref
const outboundMxTableRef = ref<ITableRef>();
//单头
const outboundHead = ref<ISaleOutboundFindTable>(new SaleOutboundFindTable());

const state = ref({
  edit: true,
  outboundcode: String(route.query.outboundcode || ''),
  outboundid: Number(route.query.outboundid || 0),
  title: "销售单",
  exitMessage: "是否退出",
  warehouseid: Number(route.query.warehouseid || 0)
})

const {buttonShowState, updateButtonState} = useButtonState();

const option: saleOutboundOption = {
  updateButtonState,
  outboundHead,
  outboundMxTableRef_hock: outboundMxTableRef,
  state: state
}

const {
  initPage,
  getRowNodeId
} = useSaleOutboundEditViewHock(option);

const {
  selectedClientEvent,
  unSelectedClientEvent,
  unSelectWarehouse,
  cellValueChangedEvent,
  cellEditingStartedEvent,
  clickedSaveButton,
  clickedL1Review,
  clickedUnL1Review,
  clickedL2Review,
  clickedUnL2Review,
  clickedDeleteData,
  clickedAddOutboundMxButton,
  clickedDeleteOutboundMxButton,
} = useSaleOutboundEditViewEvent(option);


onMounted(async () => {
  //form默认的input.focus
  const defaultInputFocus = ref();
  defaultInputFocus.value?.focus();

  //初始化页面
  await initPage();
})


</script>
<template>
  <erp-full-screen-dialog
      title="选择销售订单"
      @clicked-confirm="onClickOkSelectedDialog"
      @clicked-cancel="onClickCloseSelectedDialog"
  >
    <erp-form>
      <erp-form-item name="客户">
        <erp-select-client-input
            v-model:client-id="saleOrderMxFindDto.clientid"
            v-model:client-name="saleOrderMxFindDto.clientname"
            @change="loadSaleOrder"
            :close-btn="true"
            :un-select-sure="false"/>
      </erp-form-item>
      <erp-form-item name="销售订单号">
        <erp-input-round v-model="saleOrderMxFindDto.saleOrderCode" @change="loadSaleOrder"></erp-input-round>
      </erp-form-item>

      <erp-form-item name="产品编号">
        <erp-input-round v-model="saleOrderMxFindDto.productCode"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="产品名称">
        <erp-input-round v-model="saleOrderMxFindDto.productName"></erp-input-round>
      </erp-form-item>
      <erp-form-item name="日期范围">
        <erp-range-date
            v-model:start-date="saleOrderMxFindDto.startDate"
            v-model:end-date="saleOrderMxFindDto.endDate"
            @change="loadSaleOrder"
        ></erp-range-date>
      </erp-form-item>
    </erp-form>

    <erp-table
        ref="saleOrderMxTableRef"
        :show-filter-tips-box="true"
        :find-dto="saleOrderMxFindDto"
        :table-state="saleOrderMxITableConfig"
        @ready="loadSaleOrder"
    ></erp-table>
  </erp-full-screen-dialog>
</template>

<script lang="ts">
import {saleOrderMxITableConfig} from "@/view/saleOrder/hock/dialog/selectSaleOrderMx/saleOrderDialogTableConfig";
import {defineComponent, PropType, ref, unref} from "vue";
import ErpFullScreenDialog from "@/components/dialog/ErpFullScreenDialog.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {SaleOrderMxReportFindDto} from "@/module/report/saleOrderMxReport/saleOrderMxReportFind.dto";
import ErpSelectClientInput from "@/components/input/component/ErpSelectClientInput.vue";
import ErpRangeDate from "@/components/date/ErpRangeDate.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {ITableRef} from "@/components/table/type";
import {ISaleOrderMxOrSaleOrderOrProductOrAmt} from "@/module/saleOrder/saleOrderMx";
export default defineComponent({
  name:"saleOrderSelectDialog",
  components: {ErpTable, ErpRangeDate, ErpSelectClientInput, ErpInputRound, ErpFormItem, ErpForm, ErpFullScreenDialog},
  props:{
    findDto:{
      type:Object as PropType<SaleOrderMxReportFindDto>,
      required: true
    },
    resolve_dialog: {
      type: Function as PropType<(value: unknown) => void>,
      required: true
    },
    reject_dialog: {
      type: Function as PropType<(reason?: any) => void>,
      required: true
    },
    unmount: {
      type: Function,
      default: () => {
      },
    },
  },
  setup(props){
    const saleOrderMxFindDto = ref(new SaleOrderMxReportFindDto().setValue(unref(props.findDto)));
    const saleOrderMxTableRef = ref<ITableRef>()

    async function loadSaleOrder() {
     await saleOrderMxTableRef.value?.initTableData();
    }

    async function getSelectedSaleOrderMx(){
      return saleOrderMxTableRef.value?.getGridApi().getSelectedRows() as ISaleOrderMxOrSaleOrderOrProductOrAmt[] | []
    }

    async function onClickOkSelectedDialog(){
      props.resolve_dialog(getSelectedSaleOrderMx());
      props.unmount();
    }

    async function onClickCloseSelectedDialog(){
      props.reject_dialog();
      props.unmount();
    }

    return{
      loadSaleOrder,
      onClickOkSelectedDialog,
      onClickCloseSelectedDialog,
      saleOrderMxTableRef,
      saleOrderMxFindDto,
      saleOrderMxITableConfig,
    }
  }
})

</script>

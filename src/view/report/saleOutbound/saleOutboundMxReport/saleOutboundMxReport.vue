<template>
  <erp-page-box>
    <erp-no-title>
      <el-date-picker
          v-model="findDate"
          end-placeholder="结束日期"
          range-separator="-"
          start-placeholder="开始日期"
          type="daterange"
          unlink-panels
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="initPage"
      ></el-date-picker>
      <erp-button @click="onClickRefreshButton">刷新</erp-button>
      <template #input>
        <erp-input-round v-model="findDto.outboundcode" @change="onChangRefresh"></erp-input-round>
      </template>
    </erp-no-title>

    <erp-table
        ref="saleOutboundMxReportTable"
        :find-dto="findDto"
        :table-state="saleOutboundMxReportTableConfig"
        @cellDoubleClicked="cellDoubleClicked"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang='ts' setup>
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {onMounted, ref} from "vue";
import {
  IFindSaleOutboundDto,
  SaleOutboundMxReportFindDto
} from "@/module/report/saleOutboundReport/dto/saleOutboundMxReportFind.dto";
import {ITableRef} from "@/components/table/type";
import {
  saleOutboundMxReportTableConfig
} from "@/view/report/saleOutbound/saleOutboundMxReport/config/saleOutboundMxReportTableConfig";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {useRouter} from "vue-router";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";
import {CodeType} from "@/types/CodeType";
import {useDateSelect} from "@/composables/useDateSelect";

const saleOutboundMxReportTable = ref<ITableRef>();
const findDto = ref<IFindSaleOutboundDto>(new SaleOutboundMxReportFindDto());
const {findDate} = useDateSelect(findDto)
onMounted(async ()=>{
  await initPage()
})

async function initPage() {
  saleOutboundMxReportTable.value?.initTableData();
}

async function onChangRefresh(){
  await initPage()
}

async function onClickRefreshButton(){
  await initPage()
}

const router = useRouter();

function cellDoubleClicked(event: CellDoubleClickedEvent){

    useRouterReportToSheet(router,{
      correlationCode: event.data.outboundcode, correlationId: event.data.outboundid, correlationType: CodeType.XS
    })

}

</script>

<style lang='scss' scoped>

</style>
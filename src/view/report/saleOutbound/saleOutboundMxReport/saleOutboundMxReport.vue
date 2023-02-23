<template>
  <erp-page-box>
    <erp-no-title>
      <erp-range-date
          v-model:start-date="findDto.startDate"
          v-model:end-date="findDto.endDate"
          @change="onChangRefresh"
      />
      <erp-button @click="onClickRefreshButton">刷新</erp-button>
      <template #input>
        <erp-input-round v-model="findDto.outboundcode" @change="onChangRefresh"></erp-input-round>
      </template>
    </erp-no-title>

    <erp-table
        init
        ref="saleOutboundMxReportTable"
        :find-dto="findDto"
        :table-state="saleOutboundMxReportTableConfig"
        @cellDoubleClicked="cellDoubleClicked"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang='ts'>
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {defineComponent, onMounted, ref} from "vue";
import {
  IFindSaleOutboundDto,
  SaleOutboundMxReportFindDto
} from "@/module/report/saleOutboundReport/dto/saleOutboundMxReportFind.dto";
import {ITableRef} from "@/components/table/type";
import {
  saleOutboundMxReportTableConfig
} from "@/view/report/saleOutbound/saleOutboundMxReport/config/saleOutboundMxReportTableConfig";
import {useRouter} from "vue-router";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";
import {CodeType} from "@/types/CodeType";
import {useDateSelect} from "@/composables/useDateSelect";
import ErpRangeDate from "@/components/date/ErpRangeDate.vue";

export default defineComponent({
  name: "saleOutboundMxReport",
  components: {
    ErpRangeDate,
    ErpPageBox,
    ErpNoTitle,
    ErpButton,
    ErpTable,
    ErpInputRound,
  },
  setup() {
    const saleOutboundMxReportTable = ref<ITableRef>();
    const findDto = ref<IFindSaleOutboundDto>(new SaleOutboundMxReportFindDto());
    const {findDate} = useDateSelect(findDto)
    onMounted(async () => {
      await initPage()
    })

    async function initPage() {
      saleOutboundMxReportTable.value?.initTableData();
    }

    async function onChangRefresh() {
      console.log(findDto.value)
      await initPage()
    }

    async function onClickRefreshButton() {
      await initPage()
    }

    function cellDoubleClicked(event: CellDoubleClickedEvent) {
      const router = useRouter();
      useRouterReportToSheet(router, {
        correlationCode: event.data.outboundcode, correlationId: event.data.outboundid, correlationType: CodeType.XS
      })

    }

    return {
      findDate,
      findDto,
      saleOutboundMxReportTable,
      saleOutboundMxReportTableConfig,
      initPage,
      onChangRefresh,
      onClickRefreshButton,
      cellDoubleClicked,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>
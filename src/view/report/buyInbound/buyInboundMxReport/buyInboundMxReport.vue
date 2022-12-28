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
      <erp-select-buy-btn
          :buyname="findDto.buyname"
          @select="selectBuy"
          @unSelect="unselectBuy"
      ></erp-select-buy-btn>
      <erp-pop-over-button
          @close="clickedFilterCloseBtn"
          @ok="clickedFilterOkBtn"
          @reset="clickedFilterResetBtn"
      >
        <template #default>筛选</template>
        <template #form>
          <erp-form>
            <erp-form-item name="单据编号">
              <erp-input-round v-model="findDto.inboundcode"></erp-input-round>
            </erp-form-item>
            <erp-form-item :name="valueName.product+'名称'">
              <erp-input-round v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'"
                               @change="onChangRefresh"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="操作区域">
              <erp-operate-area-auth-select
                  v-model="operateAreaId"
                  :have-root-node="true"
                  :operateareatype="1"
                  @change="onChangRefresh"
              ></erp-operate-area-auth-select>
            </erp-form-item>
            <erp-form-item name="仓库">
              <erp-warehouse-auth-select-have-root
                  v-model="warehouseid"
                  @change="onChangRefresh"></erp-warehouse-auth-select-have-root>
            </erp-form-item>
            <erp-form-item :name="valueName.product+'编号'">
              <erp-input-round v-model="findDto.productcode"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="单位">
              <erp-input-round v-model="findDto.unit"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="规格">
              <erp-input-round v-model="findDto.spec"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="用料">
              <erp-input-round v-model="findDto.materials"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="订做规格">
              <erp-input-round v-model="findDto.spec_d"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="现用料">
              <erp-input-round v-model="findDto.materials_d"></erp-input-round>
            </erp-form-item>
          </erp-form>
        </template>
      </erp-pop-over-button>
      <erp-button @click="onClickRefreshButton">刷新</erp-button>
      <template #input>
        <erp-input-round v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'"
                         @change="onChangRefresh"></erp-input-round>
      </template>
    </erp-no-title>

    <erp-table
        init
        ref="buyInboundMxReportTable"
        :find-dto="findDto"
        :table-state="buyInboundMxReportTableConfig"
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
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpSelectBuyBtn from "@/components/button/ErpSelectBuyBtn.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpPopOverButton from "@/components/button/ErpPopOverButton.vue";
import {valueName} from "@/config/valueName";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {
  buyInboundMxReportTableConfig
} from "@/view/report/buyInbound/buyInboundMxReport/config/buyInboundMxReportTableConfig";
import {useRouterReportToSheet} from "@/utils";
import {useRouter} from "vue-router";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {CodeType} from "@/types/CodeType";
import {SaleOutboundMxReportFindDto} from "@/module/report/buyInboundMxReport/dto/saleOutboundMxReportFind.dto";
import {useDateSelect} from "@/composables/useDateSelect";
import {IBuy} from "@/module/buy/buy";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";

export default defineComponent({
  name: "BuyInboundMxReport",
  components: {
    ErpForm,
    ErpFormItem,
    ErpPageBox,
    ErpNoTitle,
    ErpButton,
    ErpTable,
    ErpInputRound,
    ErpSelectBuyBtn,
    ErpPopOverButton,
    ErpOperateAreaAuthSelect,
    ErpWarehouseAuthSelectHaveRoot,
  },
  setup() {
    const buyInboundMxReportTable = ref<ITableRef>();
    const findDto = ref(new SaleOutboundMxReportFindDto());
    const {findDate} = useDateSelect(findDto)
    const {warehouseid} = useWarehouseSelect(findDto);
    const {operateAreaId} = useOperateAreaSelect(findDto)
    onMounted(async () => {
      await initPage()
    })

    async function initPage() {
      buyInboundMxReportTable.value?.initTableData();
    }

    async function onChangRefresh() {
      await initPage()
    }

    async function onClickRefreshButton() {
      await initPage()
    }

    function selectBuy(buy: IBuy) {
      findDto.value.buyid = buy.buyid;
      findDto.value.buyname = buy.buyname;
      initPage();
    }

    function unselectBuy() {
      findDto.value.buyid = 0;
      findDto.value.buyname = '';
      initPage();
    }

    async function clickedFilterOkBtn() {
      await initPage()
    }

    async function clickedFilterCloseBtn() {
      await initPage()
    }

    async function clickedFilterResetBtn() {
      //重置查询参数
      for (let valueKey in findDto.value) {
        (findDto.value as any)[valueKey] = (new SaleOutboundMxReportFindDto() as any)[valueKey]
      }
      await initPage()
    }

    const router = useRouter();

    function cellDoubleClicked(event: CellDoubleClickedEvent) {

      useRouterReportToSheet(router, {
        correlationCode: event.data.inboundcode,
        correlationId: event.data.inboundid,
        correlationType: CodeType.buyInbound
      })

    }

    return {
      valueName,
      buyInboundMxReportTableConfig,
      buyInboundMxReportTable,
      findDto,
      findDate,
      warehouseid,
      operateAreaId,
      initPage,
      onChangRefresh,
      onClickRefreshButton,
      selectBuy,
      unselectBuy,
      clickedFilterOkBtn,
      clickedFilterCloseBtn,
      clickedFilterResetBtn,
      cellDoubleClicked,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>
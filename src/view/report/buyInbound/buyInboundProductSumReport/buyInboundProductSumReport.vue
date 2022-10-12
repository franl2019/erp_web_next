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
            <erp-form-item :label-for-name="valueName.product+'名称'">
              <erp-input-round v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'" class="w-6"
                               @change="onChangRefresh"></erp-input-round>
            </erp-form-item>
            <erp-form-item label-for-name="操作区域">
              <erp-operate-area-auth-select
                  v-model="operateAreaId"
                  :have-root-node="true"
                  :operateareatype="1"
                  @change="onChangRefresh"
              ></erp-operate-area-auth-select>
            </erp-form-item>
            <erp-form-item label-for-name="仓库">
              <erp-warehouse-auth-select-have-root
                  v-model="warehouseid"
                  @change="onChangRefresh"></erp-warehouse-auth-select-have-root>
            </erp-form-item>
            <erp-form-item :label-for-name="valueName.product+'编号'">
              <erp-input-round v-model="findDto.productcode"></erp-input-round>
            </erp-form-item>
            <erp-form-item label-for-name="单位">
              <erp-input-round v-model="findDto.unit"></erp-input-round>
            </erp-form-item>
            <erp-form-item label-for-name="规格">
              <erp-input-round v-model="findDto.spec"></erp-input-round>
            </erp-form-item>
            <erp-form-item label-for-name="用料">
              <erp-input-round v-model="findDto.materials"></erp-input-round>
            </erp-form-item>
            <erp-form-item label-for-name="订做规格">
              <erp-input-round v-model="findDto.spec_d"></erp-input-round>
            </erp-form-item>
            <erp-form-item label-for-name="现用料">
              <erp-input-round v-model="findDto.materials_d"></erp-input-round>
            </erp-form-item>
          </erp-form>
        </template>
      </erp-pop-over-button>
      <erp-button @click="onClickRefreshButton">刷新</erp-button>
      <template #input>
        <erp-input-round v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'" class="w-6"
                         @change="onChangRefresh"></erp-input-round>
      </template>
    </erp-no-title>

    <erp-table
        ref="buyInboundProductSumReportTableRef"
        :find-dto="findDto"
        :table-state="buyInboundProductSumReportTableConfig"
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
import ErpSelectBuyBtn from "@/components/button/ErpSelectBuyBtn.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpPopOverButton from "@/components/button/ErpPopOverButton.vue";
import {valueName} from "@/config/valueName";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {
  buyInboundProductSumReportTableConfig
} from "@/view/report/buyInbound/buyInboundProductSumReport/config/buyInboundProductSumReportTableConfig";
import {
  BuyInboundProductSummaryReportFindDto
} from "@/module/report/buyInboundProductSumReport/dto/saleOutboundMxReportFind.dto";
import {useDateSelect} from "@/composables/useDateSelect";
import {IBuy} from "@/module/buy/buy";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";

export default defineComponent({
  name: "BuyInboundProductSumReport",
  components: {
    ErpPageBox,
    ErpNoTitle,
    ErpButton,
    ErpTable,
    ErpInputRound,
    ErpSelectBuyBtn,
    ErpForm,
    ErpFormItem,
    ErpWarehouseAuthSelectHaveRoot,
    ErpOperateAreaAuthSelect,
    ErpPopOverButton,
  },
  setup() {
    const buyInboundProductSumReportTableRef = ref<ITableRef>();
    const findDto = ref(new BuyInboundProductSummaryReportFindDto());
    const {findDate} = useDateSelect(findDto);
    const {warehouseid} = useWarehouseSelect(findDto);
    const {operateAreaId} = useOperateAreaSelect(findDto)

    onMounted(async () => {
      await initPage()
    })

    async function initPage() {
      buyInboundProductSumReportTableRef.value?.initTableData();
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
        (findDto.value as any)[valueKey] = (new BuyInboundProductSummaryReportFindDto() as any)[valueKey]
      }
      await initPage()
    }

    return {
      findDto,
      findDate,
      warehouseid,
      operateAreaId,
      valueName,
      buyInboundProductSumReportTableRef,
      buyInboundProductSumReportTableConfig,
      initPage,
      onChangRefresh,
      onClickRefreshButton,
      selectBuy,
      unselectBuy,
      clickedFilterOkBtn,
      clickedFilterCloseBtn,
      clickedFilterResetBtn,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>
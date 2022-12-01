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
      <erp-pop-over-button
          @close="clickedFilterCloseBtn"
          @ok="clickedFilterOkBtn"
          @reset="clickedFilterResetBtn"
      >
        <template #default>筛选</template>
        <template #form>
          <erp-form>
            <erp-form-item :name="valueName.product+'名称'">
              <erp-input-round v-model="findDto.productname"></erp-input-round>
            </erp-form-item>
            <erp-form-item name="操作区域">
              <erp-operate-area-auth-select
                  v-model="operateAreaId"
                  :have-root-node="true"
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
      <template #input>

        <erp-input-round v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'"
                         @change="onChangRefresh"></erp-input-round>
      </template>
    </erp-no-title>

    <erp-table
        ref="saleOutboundProductSummaryReportTable"
        :find-dto="findDto"
        :table-state="saleOutboundProductSummaryReportTableConfig"
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
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpPopOverButton from "@/components/button/ErpPopOverButton.vue";
import {valueName} from "@/config/valueName";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {
  saleOutboundProductSummaryReportTableConfig
} from "@/view/report/saleOutbound/saleOutboundProductSummaryReport/config/saleOutboundProductSummaryReportTableConfig";
import {useDateSelect} from "@/composables/useDateSelect";
import {
  SaleOutboundProductSummaryReportFindDto
} from "@/module/report/saleOutboundProductSummaryReport/dto/saleOutboundProductSummaryReportFind.dto";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";

export default defineComponent({
  name: "saleOutboundProductSummaryReportView",
  components: {
    ErpPageBox,
    ErpNoTitle,
    ErpButton,
    ErpTable,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpPopOverButton,
    ErpOperateAreaAuthSelect,
    ErpWarehouseAuthSelectHaveRoot,
  },
  setup() {
    const saleOutboundProductSummaryReportTable = ref<ITableRef>();
    const findDto = ref(new SaleOutboundProductSummaryReportFindDto());
    const {findDate} = useDateSelect(findDto);
    const {warehouseid} = useWarehouseSelect(findDto);
    const {operateAreaId} = useOperateAreaSelect(findDto)

    onMounted(async () => {
      await initPage()
    })

    async function initPage() {
      saleOutboundProductSummaryReportTable.value?.initTableData();
    }

    async function onChangRefresh() {
      await initPage()
    }

    async function onClickRefreshButton() {
      await initPage()
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
        (findDto.value as any)[valueKey] = (new SaleOutboundProductSummaryReportFindDto() as any)[valueKey]
      }
      await initPage()
    }

    return {
      valueName,
      saleOutboundProductSummaryReportTableConfig,
      saleOutboundProductSummaryReportTable,
      findDto,
      findDate,
      warehouseid,
      operateAreaId,
      initPage,
      onChangRefresh,
      onClickRefreshButton,
      clickedFilterOkBtn,
      clickedFilterCloseBtn,
      clickedFilterResetBtn,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>
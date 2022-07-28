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
      <erp-pop-over-button
          @ok="clickedFilterOkBtn"
          @close="clickedFilterCloseBtn"
          @reset="clickedFilterResetBtn"
      >
        <template #default>筛选</template>
        <template #form>
          <erp-form>
            <erp-form-item label-for-name="客户名称">
              <erp-input-round v-model="findDto.clientname"></erp-input-round>
            </erp-form-item>
            <erp-form-item :label-for-name="valueName.product+'名称'">
              <erp-input-round class="w-6" v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'"
                               @change="onChangRefresh"></erp-input-round>
            </erp-form-item>
            <erp-form-item label-for-name="操作区域">
              <erp-operate-area-auth-select
                  v-model="operateAreaId"
                  :have-root-node="true"
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
        <erp-input-round class="w-6" v-model="findDto.productname" :placeholder="'输入'+valueName.product+'名称'"
                         @change="onChangRefresh"></erp-input-round>
      </template>
    </erp-no-title>

    <erp-table
        ref="saleOutboundClientProductSummaryReportTable"
        :find-dto="findDto"
        :table-state="saleOutboundClientProductSummaryReportTableConfig"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang='ts' setup>
import {valueName} from "@/config/valueName";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {
  saleOutboundClientProductSummaryReportTableConfig
} from "@/view/report/saleOutbound/saleOutboundClientProductSummaryReport/config/saleOutboundClientProductSummaryReportTableConfig";
import {
  SaleOutboundClientProductSummaryReportFindDto
} from "@/module/report/saleOutboundClientProductSummaryReport/dto/saleOutboundMxReportFind.dto";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpWarehouseAuthSelectHaveRoot from "@/components/select/ErpWarehouseAuthSelectHaveRoot.vue";
import ErpOperateAreaAuthSelect from "@/components/select/ErpOperateAreaAuthSelect.vue";
import ErpPopOverButton from "@/components/button/ErpPopOverButton.vue";
import {useWarehouseSelect} from "@/composables/useWarehouseSelect";
import {useOperateAreaSelect} from "@/composables/useOperateAreaSelect";
import {useDateSelect} from "@/composables/useDateSelect";


const saleOutboundClientProductSummaryReportTable = ref<ITableRef>();
const findDto = ref(new SaleOutboundClientProductSummaryReportFindDto());
const {findDate} = useDateSelect(findDto);
const {warehouseid} = useWarehouseSelect(findDto);
const {operateAreaId} = useOperateAreaSelect(findDto)

onMounted(async ()=>{
  await initPage()
})

async function initPage() {
  saleOutboundClientProductSummaryReportTable.value?.initTableData();
}

async function onChangRefresh(){
  await initPage()
}

async function onClickRefreshButton(){
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
    (findDto.value as any)[valueKey] = (new SaleOutboundClientProductSummaryReportFindDto() as any)[valueKey]
  }
  await initPage()
}
</script>

<style lang='scss' scoped>

</style>
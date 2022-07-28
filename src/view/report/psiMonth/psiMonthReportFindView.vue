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
      <erp-button @click="onClickCheckIfCountIsRequired">核算成本</erp-button>
      <erp-button @click="onClickL1Review" type="success">结转成本</erp-button>
      <erp-button @click="onClickUnL1Review" type="danger">取消结转成本</erp-button>
    </erp-no-title>

    <erp-table
        ref="psiReportTable"
        :find-dto="findDto"
        :table-state="defaultPsiMonthReportTableConfig"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang='ts' setup>
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import {onMounted, ref} from "vue";
import {PsiMonthReportFindDto} from "@/module/report/psiMonthReport/dto/psiMonthReportFind.dto";
import {defaultPsiMonthReportTableConfig} from "@/view/report/psiMonth/config/defaultPsiMonthReportTableConfig";
import {ITableRef} from "@/components/table/type";
import {useDateSelect} from "@/composables/useDateSelect";
import {WeightedAverageRecordService} from "@/module/weightedAverageRecord/weightedAverageRecord.service";
import ErpDialog from "@/components/dialog/dialog";
import moment from "moment";

const findDto = ref(new PsiMonthReportFindDto())
const psiReportTable = ref<ITableRef>()

const {findDate} = useDateSelect(findDto);
const weightedAverageRecordService= new WeightedAverageRecordService();

onMounted(async ()=>{
  await weightedAverageRecordService.checkIfCountIsRequired(findDto.value.startDate,initPage);
  await initPage();
})

async function initPage() {
  await psiReportTable.value?.initTableData()
}

async function onClickRefreshButton() {
  await initPage();
}

async function onClickCheckIfCountIsRequired(){
  const isRequired = await weightedAverageRecordService.checkIfCountIsRequired(findDto.value.startDate,initPage);
  if(!isRequired){
    ErpDialog({
      title: "提示",
      message: "无新业务发生",
      closeBtnVisible:false
    })
  }
}

async function onClickL1Review(){
  const inDate = moment(findDto.value.startDate).format('YYYY-MM')
  ErpDialog({
    title: "提示",
    message: `是否结转 ${inDate} 成本`,
    ok:async ()=>{
      await weightedAverageRecordService.l1Review(inDate);
      ErpDialog({
        title: "提示",
        message: `成功结转 ${inDate} 成本`,
        closeBtnVisible:false
      })
    }
  })
}

async function onClickUnL1Review(){
  const inDate = moment(findDto.value.startDate).format('YYYY-MM')
  ErpDialog({
    title: "提示",
    message: `是否取消结转 ${inDate} 成本`,
    ok:async ()=>{
      await weightedAverageRecordService.unl1Review(inDate);
      ErpDialog({
        title: "提示",
        message: `成功取消结转 ${inDate} 成本`,
        closeBtnVisible:false
      })
    }
  })
}
</script>

<style lang="scss">

</style>
<template>
  <erp-page-box>
    <erp_title title="">
      <template v-slot:input>
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

        <erp_input_select_buy
            :buyname="findDto.buyname"
            :un-select-sure="false"
            class="md:w-52"
            @select="selectBuy"
            @unSelect="unselectBuy"
        >
        </erp_input_select_buy>

      </template>
      <erp_button @click="initPage">刷新</erp_button>
    </erp_title>
    <erp_table
        ref="accountPayableMxReportRef"
        :find-dto="findDto"
        :table-state="defaultAccountPayableMxReportTableConfig"
        @cellDoubleClicked="cellDoubleClicked"
    >
    </erp_table>
  </erp-page-box>
</template>

<script lang="ts" setup>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import Erp_input_select_buy from "@/components/button/ErpSelectBuyBtn.vue";
import {
  defaultAccountPayableMxReportTableConfig
} from "@/view/report/accountPayable/accountPayableMxReport/config/defaultAccountPayableMxReportTableConfig";
import {AccountPayableMxReportFindDto} from "@/module/report/accountPayableMxReport/dto/accountPayableMxReportFind.dto";
import {IBuy} from "@/module/buy/buy";
import {useDateSelect} from "@/composables/useDateSelect";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import {useRouter} from "vue-router";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";

onMounted(async () => {
  await initPage();
})

const accountPayableMxReportRef = ref<ITableRef>();
const findDto = ref(new AccountPayableMxReportFindDto());

const { findDate } = useDateSelect(findDto);

async function initPage() {
  await accountPayableMxReportRef.value?.initTableData();
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

const router = useRouter();

function cellDoubleClicked(event: CellDoubleClickedEvent){
  if(event.data.correlationType > 0){
    useRouterReportToSheet(router,event.data)
  }
}
</script>
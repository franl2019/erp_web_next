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


        <erp-select-client-btn
            :clientname="findDto.clientname"
            :un-select-sure="false"
            @select="selectClient"
            @unSelect="unselectClient"
        >
        </erp-select-client-btn>

      </template>
      <erp_button @click="refreshButton">刷新</erp_button>
    </erp_title>
    <erp_table
        ref="accountReceivableMxReportRef"
        :table-state="defaultAccountReceivableMxReportTableConfig"
        :find-dto="findDto"
        @cellDoubleClicked="cellDoubleClicked"
    >
    </erp_table>
  </erp-page-box>
</template>

<script setup lang="ts">
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";

import {
  AccountReceivableMxReportFindDto
} from "@/module/report/accountReceivableMxReport/dto/accountReceivableMxReportFind.dto";
import {
  defaultAccountReceivableMxReportTableConfig
} from "@/view/report/accountsReceivable/accountReceivableMxReport/config/defaultAccountReceivableMxReportTableConfig";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import {IClient} from "@/module/client/client";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import {useDateSelect} from "@/composables/useDateSelect";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";
import {useRouter} from "vue-router";

onMounted(async () => {
  await initPage();
})

const accountReceivableMxReportRef = ref<ITableRef>();
const findDto = ref(new AccountReceivableMxReportFindDto());

//设置默认日期
const {findDate} = useDateSelect(findDto)

async function initPage() {
  await accountReceivableMxReportRef.value?.initTableData();
}

async function refreshButton() {
  await accountReceivableMxReportRef.value?.initTableDataList()
  await initPage();
}

function selectClient(client: IClient) {
  findDto.value.clientid = client.clientid;
  findDto.value.clientname = client.clientname;
  initPage();
}

function unselectClient() {
  findDto.value.clientid = 0;
  findDto.value.clientname = '';
  initPage();
}

const router = useRouter();

function cellDoubleClicked(event: CellDoubleClickedEvent){
  if(event.data.correlationType > 0){
    useRouterReportToSheet(router,event.data)
  }
}
</script>
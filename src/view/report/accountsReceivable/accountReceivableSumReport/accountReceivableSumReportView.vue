<template>
  <erp-page-box>
    <erp-title title="">
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
        ></erp-select-client-btn>

      </template>
      <erp-button @click="initPage">刷新</erp-button>
    </erp-title>
    <erp-table
        ref="accountReceivableSumReportRef"
        :table-state="defaultAccountReceivableSumReportTableConfig"
        :find-dto="findDto"
    ></erp-table>
  </erp-page-box>
</template>

<script setup lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import {IClient} from "@/module/client/client";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import {useDateSelect} from "@/composables/useDateSelect";
import {
  defaultAccountReceivableSumReportTableConfig
} from "@/view/report/accountsReceivable/accountReceivableSumReport/config/defaultAccountReceivableSumReportTableConfig";
import {
  AccountReceivableSumReportFindDto
} from "@/module/report/accountReceivableSumReport/dto/accountReceivableSumReportFind.dto";

onMounted(async () => {
  await initPage();
})

const accountReceivableSumReportRef = ref<ITableRef>();
const findDto = ref(new AccountReceivableSumReportFindDto());

//设置默认日期
const {findDate} = useDateSelect(findDto)

async function initPage() {
  await accountReceivableSumReportRef.value?.initTableData();
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
</script>
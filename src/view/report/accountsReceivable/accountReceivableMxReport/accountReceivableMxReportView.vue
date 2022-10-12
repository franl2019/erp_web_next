<template>
  <erp-page-box>
    <erp-title title="">
      <template #input>
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
      <erp-button @click="refreshButton">刷新</erp-button>
    </erp-title>
    <erp-table
        ref="accountReceivableMxReportRef"
        :find-dto="findDto"
        :table-state="defaultAccountReceivableMxReportTableConfig"
        @cellDoubleClicked="cellDoubleClicked"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {
  AccountReceivableMxReportFindDto
} from "@/module/report/accountReceivableMxReport/dto/accountReceivableMxReportFind.dto";
import {
  defaultAccountReceivableMxReportTableConfig
} from "@/view/report/accountsReceivable/accountReceivableMxReport/config/defaultAccountReceivableMxReportTableConfig";
import {IClient} from "@/module/client/client";
import {useDateSelect} from "@/composables/useDateSelect";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "AccountReceivableMxReportView",
  components: {
    ErpTitle,
    ErpTable,
    ErpButton,
    ErpPageBox,
    ErpSelectClientBtn
  },
  setup() {
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

    function cellDoubleClicked(event: CellDoubleClickedEvent) {
      if (event.data.correlationType > 0) {
        useRouterReportToSheet(router, event.data)
      }
    }

    return {
      findDto,
      findDate,
      accountReceivableMxReportRef,
      defaultAccountReceivableMxReportTableConfig,
      initPage,
      refreshButton,
      selectClient,
      unselectClient,
      cellDoubleClicked,
    };
  },
});
</script>
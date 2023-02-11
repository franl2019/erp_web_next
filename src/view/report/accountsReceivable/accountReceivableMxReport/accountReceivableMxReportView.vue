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

        <erp-select-client-input
            v-model:client-id="findDto.clientid"
            v-model:client-name="findDto.clientname"
            :un-select-sure="false"
            @change="unselectClient"
        >
        </erp-select-client-input>

      </template>
      <erp-button @click="refreshButton">刷新</erp-button>
    </erp-title>
    <erp-table
        init
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
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {
  AccountReceivableMxReportFindDto
} from "@/module/report/accountReceivableMxReport/dto/accountReceivableMxReportFind.dto";
import {
  defaultAccountReceivableMxReportTableConfig
} from "@/view/report/accountsReceivable/accountReceivableMxReport/config/defaultAccountReceivableMxReportTableConfig";
import {useDateSelect} from "@/composables/useDateSelect";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";
import {useRouter} from "vue-router";
import ErpSelectClientInput from "@/components/input/component/ErpSelectClientInput.vue";

export default defineComponent({
  name: "AccountReceivableMxReportView",
  components: {
    ErpSelectClientInput,
    ErpTitle,
    ErpTable,
    ErpButton,
    ErpPageBox,
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

    function unselectClient() {
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
      unselectClient,
      cellDoubleClicked,
    };
  },
});
</script>
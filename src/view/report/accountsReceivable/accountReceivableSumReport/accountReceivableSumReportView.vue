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

        <erp-select-client-input
            v-model:client-id="findDto.clientid"
            v-model:client-name="findDto.clientname"
            :un-select-sure="false"
            @unSelect="unselectClient"
        ></erp-select-client-input>

      </template>
      <erp-button @click="initPage">刷新</erp-button>
    </erp-title>
    <erp-table
        init
        ref="accountReceivableSumReportRef"
        :find-dto="findDto"
        :table-state="defaultAccountReceivableSumReportTableConfig"
    ></erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {useDateSelect} from "@/composables/useDateSelect";
import {
  defaultAccountReceivableSumReportTableConfig
} from "@/view/report/accountsReceivable/accountReceivableSumReport/config/defaultAccountReceivableSumReportTableConfig";
import {
  AccountReceivableSumReportFindDto
} from "@/module/report/accountReceivableSumReport/dto/accountReceivableSumReportFind.dto";
import ErpSelectClientInput from "@/components/input/component/ErpSelectClientInput.vue";

export default defineComponent({
  name: "AccountReceivableSumReportView",
  components: {
    ErpSelectClientInput,
    ErpButton,
    ErpTitle,
    ErpTable,
    ErpPageBox
  },
  setup() {
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

    function unselectClient() {
      initPage();
    }

    return {
      findDto,
      findDate,
      accountReceivableSumReportRef,
      defaultAccountReceivableSumReportTableConfig,
      initPage,
      unselectClient,
    };
  },
});
</script>
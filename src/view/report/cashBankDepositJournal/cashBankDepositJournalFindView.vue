<template>
  <erp-page-box>
    <erp_title title="现金银行存款日记账户">
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
        <erp_select_account
            v-model="cashBankDepositJournalFindDto.accountId"
            class="md:w-36"
            @change="initPage"></erp_select_account>
      </template>
      <erp_button @click="initPage">刷新</erp_button>
    </erp_title>
    <erp_table
        ref="cashBankDepositJournal"
        :find-dto="cashBankDepositJournalFindDto"
        :table-state="defaultCashBankDepositJournalTableConfig"
    >
    </erp_table>
  </erp-page-box>
</template>

<script lang="ts" setup>
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import {
  defaultCashBankDepositJournalTableConfig
} from "@/view/report/cashBankDepositJournal/config/defaultCashBankDepositJournalTableConfig";
import {computed, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {CashBankDepositJournalFindDto} from "@/module/report/cashBankDepositJournal/dto/cashBankDepositJournalFind.dto";
import Erp_select_account from "@/components/select/ErpAcountSelect.vue";
import {getEndDate, getStartDate} from "@/utils";
import ErpPageBox from "@/components/page/ErpPageBox.vue";

onMounted(async () => {
  await initPage();
})

const cashBankDepositJournal = ref<ITableRef>();
const cashBankDepositJournalFindDto = ref(new CashBankDepositJournalFindDto());
//设置默认日期
const findDate = computed({
  get: () => {
    return [cashBankDepositJournalFindDto.value.startDate, cashBankDepositJournalFindDto.value.endDate]
  },
  set: async (val) => {
    if (val) {
      cashBankDepositJournalFindDto.value.startDate = val[0]
      cashBankDepositJournalFindDto.value.endDate = val[1]
    } else {
      cashBankDepositJournalFindDto.value.startDate = getStartDate();
      cashBankDepositJournalFindDto.value.endDate = getEndDate();
    }
  }
})

async function initPage() {
  await cashBankDepositJournal.value?.initTableData();
}
</script>
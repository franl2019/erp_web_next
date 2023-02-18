<template>
  <erp-page-box>
    <erp-title title="现金银行存款日记账户">
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
        <erp-account-select
            v-model="cashBankDepositJournalFindDto.accountId"
            class="md:w-36"
            @change="initPage"></erp-account-select>
      </template>
      <erp-button @click="initPage">刷新</erp-button>
    </erp-title>
    <erp-table
        init
        ref="cashBankDepositJournalRef"
        :find-dto="cashBankDepositJournalFindDto"
        :table-state="defaultCashBankDepositJournalTableConfig"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpAccountSelect from "@/components/select/ErpAccountSelect.vue";
import {
  defaultCashBankDepositJournalTableConfig
} from "@/view/report/cashBankDepositJournal/config/defaultCashBankDepositJournalTableConfig";
import {computed, defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {CashBankDepositJournalFindDto} from "@/module/report/cashBankDepositJournal/dto/cashBankDepositJournalFind.dto";
import {useGetEndDate, useGetStartDate} from "@/utils";

export default defineComponent({
  name: "CashBankDepositJournalFindView",
  components: {
    ErpTitle,
    ErpButton,
    ErpPageBox,
    ErpTable,
    ErpAccountSelect
  },
  setup() {
    onMounted(async () => {
      await initPage();
    })

    const cashBankDepositJournalRef = ref<ITableRef>();
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
          cashBankDepositJournalFindDto.value.startDate = useGetStartDate();
          cashBankDepositJournalFindDto.value.endDate = useGetEndDate();
        }
      }
    })

    async function initPage() {
      await cashBankDepositJournalRef.value?.initTableData();
    }

    return {
      defaultCashBankDepositJournalTableConfig,
      cashBankDepositJournalRef,
      cashBankDepositJournalFindDto,
      findDate,
      initPage,
    };
  },
});
</script>
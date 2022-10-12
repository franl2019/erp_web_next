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
            @change="initPage">
        </el-date-picker>

        <erp-select-buy-btn
            :buyname="findDto.buyname"
            :un-select-sure="false"
            class="md:w-52"
            @select="selectBuy"
            @unSelect="unselectBuy">
        </erp-select-buy-btn>

      </template>
      <erp-button @click="initPage">刷新</erp-button>
    </erp-title>
    <erp-table
        ref="accountPayableMxReportRef"
        :find-dto="findDto"
        :table-state="defaultAccountPayableMxReportTableConfig"
        @cellDoubleClicked="cellDoubleClicked">
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpSelectBuyBtn from "@/components/button/ErpSelectBuyBtn.vue";
import {defineComponent, onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {
  defaultAccountPayableMxReportTableConfig
} from "@/view/report/accountPayable/accountPayableMxReport/config/defaultAccountPayableMxReportTableConfig";
import {AccountPayableMxReportFindDto} from "@/module/report/accountPayableMxReport/dto/accountPayableMxReportFind.dto";
import {IBuy} from "@/module/buy/buy";
import {useDateSelect} from "@/composables/useDateSelect";
import {useRouter} from "vue-router";
import {CellDoubleClickedEvent} from "ag-grid-community";
import {useRouterReportToSheet} from "@/utils";

export default defineComponent({
  name: "AccountPayableMxReportView",
  components: {
    ErpButton,
    ErpTitle,
    ErpPageBox,
    ErpSelectBuyBtn,
    ErpTable,
  },
  setup() {
    onMounted(async () => {
      await initPage();
    })

    const accountPayableMxReportRef = ref<ITableRef>();
    const findDto = ref(new AccountPayableMxReportFindDto());

    const {findDate} = useDateSelect(findDto);

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

    function cellDoubleClicked(event: CellDoubleClickedEvent) {
      const router = useRouter();
      if (event.data.correlationType > 0) {
        useRouterReportToSheet(router, event.data)
      }
    }

    return {
      findDto,
      findDate,
      accountPayableMxReportRef,
      defaultAccountPayableMxReportTableConfig,
      initPage,
      selectBuy,
      unselectBuy,
      cellDoubleClicked,
    };
  },
});
</script>
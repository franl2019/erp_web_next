<template>
  <erp-page-box>
    <erp-title title="">
      <template v-slot:input>
        <el-date-picker v-model="findDate" end-placeholder="结束日期" range-separator="-" start-placeholder="开始日期"
                        type="daterange" unlink-panels value-format="YYYY-MM-DD HH:mm:ss"
                        @change="initPage"></el-date-picker>

        <erp-select-buy-btn :buyname="findDto.buyname" :un-select-sure="false" class="md:w-52" @select="selectBuy"
                            @unSelect="unselectBuy">
        </erp-select-buy-btn>

      </template>
      <erp-button @click="initPage">刷新</erp-button>
    </erp-title>
    <erp-table
        init
        ref="accountPayableSumReportRef"
        :find-dto="findDto"
               :table-state="defaultAccountPayableSumReportTableConfig">
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
import {IBuy} from "@/module/buy/buy";
import {useDateSelect} from "@/composables/useDateSelect";
import {
  defaultAccountPayableSumReportTableConfig
} from "@/view/report/accountPayable/accountPayableSumReport/config/defaultAccountPayableSumReportTableConfig";
import {
  AccountPayableSumReportFindDto
} from "@/module/report/accountPayableSumReport/dto/accountPayableSumReportFind.dto";

export default defineComponent({
  name: "AccountPayableSumReportView",
  components: {
    ErpTitle,
    ErpTable,
    ErpPageBox,
    ErpButton,
    ErpSelectBuyBtn
  },
  setup() {
    onMounted(async () => {
      await initPage();
    })

    const accountPayableSumReportRef = ref<ITableRef>();
    const findDto = ref(new AccountPayableSumReportFindDto());

    const {findDate} = useDateSelect(findDto);

    async function initPage() {
      await accountPayableSumReportRef.value?.initTableData();
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

    return {
      findDto,
      findDate,
      accountPayableSumReportRef,
      defaultAccountPayableSumReportTableConfig,
      initPage,
      selectBuy,
      unselectBuy,
    };
  },
});
</script>
<template>
  <erp-page-box>
    <erp-no-title title="采购付款单">
      <erp-button :disabled="!buttonShowState.create" @click="clickedCreateButton">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success" @click="clickedEditButton">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteButton">删除</erp-button>
      <erp-delimiter />
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedL1ReviewButton">审核
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnL1ReviewBtn">撤审
      </erp-button>
      <erp-delimiter />
      <erp-button v-reqClick="clickedRefreshButton">刷新</erp-button>
      <template v-slot:input>
        <el-date-picker v-model="findDate" end-placeholder="结束日期" range-separator="-" start-placeholder="开始日期"
          type="daterange" unlink-panels value-format="YYYY-MM-DD HH:mm:ss" @change="onChangeSearch"></el-date-picker>
        <erp-input-round v-model="accountExpenditureFindDto.accountExpenditureCode" class="md:w-60" placeholder="输入单号搜索"
          @change="onChangeSearch"></erp-input-round>
      </template>
    </erp-no-title>

    <erp-table ref="accountExpenditureTableRef" :find-dto="accountExpenditureFindDto"
      :getRowNodeId="getRowNodeId_headTable" :table-state="defaultAccountExpenditureTableConfig"
      @selection-changed="onSelectionChanged">
    </erp-table>
    <erp-title title="付款明细"></erp-title>
    <erp-table ref="accountExpenditureAmountMxTableRef" :find-dto="accountExpenditureAmountMxFindDto"
      :table-state="defaultAccountExpenditureAmountMxTableConfig">
    </erp-table>
    <erp-title title="核销明细"></erp-title>
    <erp-table ref="accountExpenditureSheetMxTableRef" :find-dto="accountExpenditureSheetMxFindDto"
      :table-state="defaultAccountExpenditureSheetMxTableConfig">
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import { useRouter } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import { ITableRef } from "@/components/table/type";
import {
  defaultAccountExpenditureTableConfig
} from "@/view/accountExpenditure/config/defaultAccountExpenditureTableConfig";
import { AccountExpenditureFindDto } from "@/module/accountExpenditure/dto/accountExpenditureFind.dto";
import { getButtonState, IButtonState } from "@/composables/useSheetButtonState";
import { IAccountExpenditureFind } from "@/module/accountExpenditure/accountExpenditure";
import ErpDialog from "@/components/dialog/dialog";
import { AccountExpenditureService } from "@/module/accountExpenditure/accountExpenditure.service";
import {
  defaultAccountExpenditureAmountMxTableConfig
} from "@/view/accountExpenditure/config/defaultAccountExpenditureAmountMxTableConfig";
import { AccountExpenditureAmountMxFindDto } from "@/module/accountExpenditure/dto/accountExpenditureAmountMxFind.dto";
import {
  defaultAccountExpenditureSheetMxTableConfig
} from "@/view/accountExpenditure/config/defaultAccountExpenditureSheetMxTableConfig";
import { AccountExpenditureSheetMxFindDto } from "@/module/accountExpenditure/dto/accountExpenditureSheetMxFind.dto";
import { useDateSelect } from "@/composables/useDateSelect";
import { useRouterPage } from "@/utils";
import { VerifyParamError } from "@/types/error/verifyParamError";

export default defineComponent({
  name:"accountExpenditureFind",
  expose:["activated"],
  components:{
    ErpNoTitle,
    ErpTitle,
    ErpTable,
    ErpInputRound,
    ErpPageBox,
    ErpDelimiter,
    ErpButton
  },
  setup() {
    const router = useRouter();
    const accountExpenditureTableRef = ref<ITableRef>();
    const accountExpenditureAmountMxTableRef = ref<ITableRef>();
    const accountExpenditureSheetMxTableRef = ref<ITableRef>();
    const accountExpenditureFindDto = ref(new AccountExpenditureFindDto());
    const accountExpenditureAmountMxFindDto = ref(new AccountExpenditureAmountMxFindDto());
    const accountExpenditureSheetMxFindDto = ref(new AccountExpenditureSheetMxFindDto());
    const buttonShowState = ref<IButtonState>({
      create: true,
      edit: false,
      level1review: false,
      un_level1review: false,
      level2review: false,
      un_level2review: false,
      delete_data: false
    });

    //设置单头表格id
    function getRowNodeId_headTable(data: IAccountExpenditureFind) {
      return data.accountExpenditureId
    }

    //付款单服务
    const accountExpenditureService = new AccountExpenditureService();

    //设置默认日期
    const { findDate } = useDateSelect(accountExpenditureFindDto);

    onMounted(async () => {
      await initPage();
    })

    async function activated(){
      await initPage()
    }

    async function initPage() {
      buttonShowState.value = getButtonState();
      await accountExpenditureTableRef.value?.initTableData();
    }

    async function initHeadTableData() {
      await accountExpenditureTableRef.value?.getGridApi().setRowData([]);
    }

    //初始化收款明细表数据
    async function initAmountMxTableData(accountExpenditureId?: number) {
      await accountExpenditureAmountMxTableRef.value?.initTableDataList();

      if (accountExpenditureId) {
        accountExpenditureAmountMxFindDto.value.accountExpenditureId = accountExpenditureId;
        await accountExpenditureAmountMxTableRef.value?.initTableData();
      }
    }

    //初始化核销明细表数据
    async function initSheetMxTableData(accountExpenditureId?: number) {
      await accountExpenditureSheetMxTableRef.value?.initTableDataList();

      if (accountExpenditureId) {
        accountExpenditureSheetMxFindDto.value.accountExpenditureId = accountExpenditureId;
        await accountExpenditureSheetMxTableRef.value?.initTableData();
      }
    }

    //获取已选中单据
    async function getSelected() {
      const accountExpenditureSelectedRows = await accountExpenditureTableRef.value?.getGridApi().getSelectedRows();
      if (accountExpenditureSelectedRows && accountExpenditureSelectedRows.length > 0) {
        return accountExpenditureSelectedRows[0] as IAccountExpenditureFind
      } else {
        return Promise.reject(new VerifyParamError("请选择单据"))
      }
    }

    //设置选中行
    async function setSelectedRow(accountExpenditureId: number) {
      accountExpenditureTableRef.value?.getGridApi().getRowNode(String(accountExpenditureId))?.setSelected(true);
    }

    //event -----------------------------------------
    async function onChangeSearch() {
      await accountExpenditureTableRef.value?.initTableData();
      buttonShowState.value = getButtonState();
      await initAmountMxTableData();
      await initSheetMxTableData();
    }

    //单据列表 选择已更改
    async function onSelectionChanged() {
      const accountExpenditure = await getSelected();
      buttonShowState.value = getButtonState(accountExpenditure.level1Review, accountExpenditure.level2Review);
      await initAmountMxTableData(accountExpenditure.accountExpenditureId);
      await initSheetMxTableData(accountExpenditure.accountExpenditureId);
    }

    async function clickedRefreshButton() {
      await initAmountMxTableData();
      await initSheetMxTableData();
      await initHeadTableData();
      await initPage();
    }

    //单击创建按钮
    function clickedCreateButton() {
      const route = router.resolve({
        name: "accountExpenditureCreate",
        query: {
          id: 0
        }
      });
      useRouterPage(route.fullPath, route.meta.title as string);
    }

    //单击编辑按钮
    async function clickedEditButton() {
      const { accountExpenditureId } = await getSelected();
      const route = await router.resolve({
        name: "accountExpenditureEdit",
        query: {
          accountExpenditureId: String(accountExpenditureId)
        }
      })
      useRouterPage(route.fullPath, route.meta.title as string);
    }

    //单击删除按钮
    async function clickedDeleteButton() {
      const { accountExpenditureCode, amount, accountExpenditureId } = await getSelected();
      ErpDialog({
        title: "提示",
        message: `是否删除单据${accountExpenditureCode},金额:${amount}`,
        ok: async () => {
          //删除支出单
          await accountExpenditureService.delete_data({ accountExpenditureId });
          //刷新
          await initAmountMxTableData();
          await initSheetMxTableData();
          await initPage();
        }
      })
    }

    //单击审核按钮
    async function clickedL1ReviewButton() {
      const { accountExpenditureCode, amount, accountExpenditureId } = await getSelected();
      ErpDialog({
        title: "提示",
        message: `是否审核单据${accountExpenditureCode},金额:${amount}`,
        ok: async () => {
          await accountExpenditureService.level1Review({ accountExpenditureId });
          await initAmountMxTableData();
          await initSheetMxTableData();
          await initPage();
          await setSelectedRow(accountExpenditureId)
        }
      })
    }

    //单击撤审按钮
    async function clickedUnL1ReviewBtn() {
      const { accountExpenditureCode, amount, accountExpenditureId } = await getSelected();
      ErpDialog({
        title: "提示",
        message: `是否撤审单据${accountExpenditureCode},金额:${amount}`,
        ok: async () => {
          await accountExpenditureService.unLevel1Review({ accountExpenditureId });
          await initAmountMxTableData();
          await initSheetMxTableData();
          await initPage();
          await setSelectedRow(accountExpenditureId)
        }
      })
    }
    return {
      defaultAccountExpenditureTableConfig,
      defaultAccountExpenditureAmountMxTableConfig,
      defaultAccountExpenditureSheetMxTableConfig,
      accountExpenditureTableRef,
      accountExpenditureAmountMxTableRef,
      accountExpenditureSheetMxTableRef,
      accountExpenditureFindDto,
      accountExpenditureAmountMxFindDto,
      accountExpenditureSheetMxFindDto,
      buttonShowState,
      findDate,
      activated,
      getRowNodeId_headTable,
      onChangeSearch,
      onSelectionChanged,
      clickedRefreshButton,
      clickedCreateButton,
      clickedEditButton,
      clickedDeleteButton,
      clickedL1ReviewButton,
      clickedUnL1ReviewBtn,
    };
  },
});
</script>
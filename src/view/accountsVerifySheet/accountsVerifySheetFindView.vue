<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button :disabled="!buttonShowState.create" @click="clickedCreateBtn">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success" @click="clickedEditButton">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteButton">删除
      </erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedL1ReviewButton">审核
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnL1ReviewButton">撤审
      </erp-button>
      <erp-delimiter/>
      <erp-button @click="clickedRefreshButton">刷新</erp-button>
      <template v-slot:input>
        <el-date-picker v-model="findDate" end-placeholder="结束日期" range-separator="-" start-placeholder="开始日期"
                        type="daterange" unlink-panels value-format="YYYY-MM-DD HH:mm:ss"
                        @change="initPage"></el-date-picker>
      </template>
    </erp-no-title>
    <erp-table
        ref="accountsVerifySheetFindRef"
        :find-dto="findDto"
        :getRowNodeId="getRowNodeIdForHeadTable"
        :table-state="accountsVerifySheetFindTableConfig"
        init
        @selection-changed="onSelectionChanged"
    >
    </erp-table>

    <erp-title title="核销明细">
    </erp-title>
    <erp-table ref="accountsVerifySheetMxFindRef" :find-dto="findMxDto"
               :table-state="accountsVerifySheetMxFindTableConfig">
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpTable from "@/components/table/ErpTable.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {
  accountsVerifySheetFindTableConfig
} from "@/view/accountsVerifySheet/tableConfig/accountsVerifySheetFindTableConfig";
import {
  accountsVerifySheetMxFindTableConfig
} from "@/view/accountsVerifySheet/tableConfig/accountsVerifySheetMxFindTableConfig";
import useErpDialog from "@/components/dialog/useErpDialog";
import {useRouter} from "vue-router";
import {ITableRef} from "@/components/table/type";
import {useRouterPage} from "@/utils";
import {useDateSelect} from "@/composables/useDateSelect";
import {defineComponent, onMounted, ref} from "vue";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {IAccountsVerifySheetFind} from "@/module/accountsVerifySheet/accountsVerifySheet";
import {AccountsVerifySheetService} from "@/module/accountsVerifySheet/accountsVerifySheet.service";
import {AccountsVerifySheetFindDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetFind.dto";
import {getButtonState, IButtonState} from "@/composables/useSheetButtonState";
import {AccountsVerifySheetMxFindDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetMxFind.dto";

export default defineComponent({
  name: "accountsVerifySheetFindView",
  expose: ["activated"],
  components: {
    ErpTable,
    ErpTitle,
    ErpButton,
    ErpPageBox,
    ErpNoTitle,
    ErpDelimiter,
  },
  setup() {
    const router = useRouter();
    const accountsVerifySheetFindRef = ref<ITableRef>();
    const accountsVerifySheetMxFindRef = ref<ITableRef>();
    const findDto = ref(new AccountsVerifySheetFindDto());
    const findMxDto = ref(new AccountsVerifySheetMxFindDto());
    const accountsVerifySheetService = new AccountsVerifySheetService();
    const {findDate} = useDateSelect(findDto);
    const buttonShowState = ref<IButtonState>({
      create: true,
      edit: false,
      level1review: false,
      un_level1review: false,
      level2review: false,
      un_level2review: false,
      delete_data: false
    });

    async function activated() {
      await initPage()
    }

    onMounted(async () => {
      await initPage();
    })

    function getRowNodeIdForHeadTable(data: IAccountsVerifySheetFind) {
      return data.accountsVerifySheetId
    }

    async function initPage() {
      await initHeadTableData();
    }

    async function initHeadTableData() {
      await accountsVerifySheetFindRef.value?.initTableData();
    }

    async function initSheetMxTableData(accountsVerifySheetId?: number) {
      if (accountsVerifySheetId && accountsVerifySheetId !== 0) {
        findMxDto.value.accountsVerifySheetId = accountsVerifySheetId;
        await accountsVerifySheetMxFindRef.value?.initTableDataList();
        await accountsVerifySheetMxFindRef.value?.initTableData();
      } else {
        await accountsVerifySheetMxFindRef.value?.initTableDataList();
      }

    }

    function initButtonState() {
      buttonShowState.value = getButtonState();
    }

    function getTableSelected() {
      const accountsVerifySheetList = accountsVerifySheetFindRef.value?.getGridApi().getSelectedRows();
      if (accountsVerifySheetList && accountsVerifySheetList.length > 0) {
        return accountsVerifySheetList[0] as IAccountsVerifySheetFind
      } else {
        return Promise.reject(new VerifyParamError("请先选择单据"))
      }
    }

    async function selectHeadSheetTableRow(accountsVerifySheetId: number) {
      await accountsVerifySheetFindRef.value?.getGridApi().getRowNode(String(accountsVerifySheetId))?.setSelected(true);
    }

    async function onSelectionChanged() {
      const {level1Review, level2Review, accountsVerifySheetId} = await getTableSelected();
      buttonShowState.value = getButtonState(level1Review, level2Review);
      await initSheetMxTableData(accountsVerifySheetId);
    }

    function clickedCreateBtn() {
      const route = router.resolve({
        name: 'accountsVerifySheetCreate'
      })

      useRouterPage(route.fullPath, route.meta.title as string);
    }

    async function clickedRefreshButton() {
      initButtonState();
      await initHeadTableData();
      await initSheetMxTableData();
      await initPage();
    }

    async function clickedEditButton() {
      const {accountsVerifySheetId} = await getTableSelected();
      const route = await router.resolve({
        name: 'accountsVerifySheetEdit',
        query: {
          accountsVerifySheetId: accountsVerifySheetId
        }
      })

      useRouterPage(route.fullPath, route.meta.title as string);
    }

    async function clickedDeleteButton() {
      const {accountsVerifySheetCode, accountsVerifySheetId} = await getTableSelected();
      useErpDialog({
        title: "提示",
        message: `是否删除 ${accountsVerifySheetCode} 核销单`,
        ok: async () => {
          await accountsVerifySheetService.delete_data({accountsVerifySheetId});
          initButtonState();
          await accountsVerifySheetMxFindRef.value?.initTableDataList();
          await initPage();
        }
      })
    }

    async function clickedL1ReviewButton() {
      const {accountsVerifySheetCode, accountsVerifySheetId} = await getTableSelected();
      useErpDialog({
        title: "提示",
        message: `是否审核 ${accountsVerifySheetCode} 核销单`,
        ok: async () => {
          await accountsVerifySheetService.L1Review({accountsVerifySheetId: accountsVerifySheetId});
          await accountsVerifySheetFindRef.value?.initTableData();
          await initSheetMxTableData();
          await selectHeadSheetTableRow(accountsVerifySheetId);
        }
      })
    }

    async function clickedUnL1ReviewButton() {
      const {accountsVerifySheetCode, accountsVerifySheetId} = await getTableSelected();
      useErpDialog({
        title: "提示",
        message: `是否撤审 ${accountsVerifySheetCode} 核销单`,
        ok: async () => {
          await accountsVerifySheetService.unL1Review({accountsVerifySheetId});
          await accountsVerifySheetFindRef.value?.initTableData();
          await initSheetMxTableData();
          await selectHeadSheetTableRow(accountsVerifySheetId);
        }
      })
    }

    return {
      accountsVerifySheetFindTableConfig,
      accountsVerifySheetMxFindTableConfig,
      accountsVerifySheetFindRef,
      accountsVerifySheetMxFindRef,
      findDto,
      findMxDto,
      buttonShowState,
      findDate,
      initPage,
      activated,
      onSelectionChanged,
      clickedCreateBtn,
      clickedRefreshButton,
      getRowNodeIdForHeadTable,
      clickedEditButton,
      clickedDeleteButton,
      clickedL1ReviewButton,
      clickedUnL1ReviewButton,
    };
  },
});
</script>
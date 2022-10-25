<template>
  <erp-page-box>
    <erp-no-title title="销售收款单">
      <erp-button :disabled="!buttonShowState.create" @click="clickedCreateBtn">新增</erp-button>
      <erp-button :disabled="!buttonShowState.edit" type="success" @click="clickedEditBtn">修改</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteBtn">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedLevel1ReviewBtn">审核
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnLevel1ReviewBtn">撤审
      </erp-button>
      <erp-delimiter/>
      <erp-button v-reqClick="initPage">刷新</erp-button>
      <template v-slot:input>
        <el-date-picker v-model="findDate" end-placeholder="结束日期" range-separator="-" start-placeholder="开始日期"
                        type="daterange" unlink-panels value-format="YYYY-MM-DD HH:mm:ss"
                        @change="initPage"></el-date-picker>
      </template>
    </erp-no-title>
    <erp-table ref="accountInComeFindTableRef"
               init
               :find-dto="accountInComeFindDto"
               :getRowNodeId="getHeadTableRowNodeId"
               :table-state="defaultAccountInComeTableConfig"
               @selectionChanged="selectionChanged">
    </erp-table>

    <erp-title title="收款明细">
    </erp-title>

    <erp-table ref="accountInComeAmountMxFindTableRef"
               :find-dto="accountInComeAmountMxFindDto"
               :table-state="defaultAccountInComeAmountMxTableConfig">
    </erp-table>

    <erp-title title="核销明细">
    </erp-title>

    <erp-table ref="accountInComeSheetMxFindTableRef" :find-dto="accountInComeSheetMxFindDto"
               :table-state="defaultAccountInComeSheetMxTableConfig">
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {defaultAccountInComeTableConfig} from "@/view/accountInCome/config/defaultAccountInComeTableConfig";
import {defineComponent, ref} from "vue";
import {AccountInComeFindDto} from "@/module/accountInCome/dto/accountInComeFind.dto";
import {ITableRef} from "@/components/table/type";
import {useRouter} from "vue-router";
import {IAccountInCome, IAccountInComeFind} from "@/module/accountInCome/accountInCome";
import useErpDialog from "@/components/dialog/useErpDialog";
import {AccountInComeService} from "@/module/accountInCome/accountInCome.service";
import {
  defaultAccountInComeAmountMxTableConfig
} from "@/view/accountInCome/config/defaultAccountInComeAmountMxTableConfig";
import {AccountInComeAmountMxFindDto} from "@/module/accountInCome/dto/amountMx/accountInComeAmountMxFind.dto";
import {
  defaultAccountInComeSheetMxTableConfig
} from "@/view/accountInCome/config/defaultAccountInComeSheetMxTableConfig";
import {AccountInComeSheetMxFindDto} from "@/module/accountInCome/dto/sheetMx/accountInComeSheetMxFind.dto";
import {useDateSelect} from "@/composables/useDateSelect";
import {useRouterPage} from "@/utils";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {useButtonState} from "@/composables/useButtonState";

export default defineComponent({
  name: "accountInComeFind",
  components: {
    ErpPageBox,
    ErpNoTitle,
    ErpDelimiter,
    ErpTitle,
    ErpButton,
    ErpTable,
  },
  setup(_props,{expose}) {
    async function activated() {
      await initPage()
    }

    expose({activated})

    const router = useRouter();
    const accountInComeFindDto = ref(new AccountInComeFindDto());
    const accountInComeAmountMxFindDto = ref(new AccountInComeAmountMxFindDto());
    const accountInComeSheetMxFindDto = ref(new AccountInComeSheetMxFindDto());

    const accountInComeFindTableRef = ref<ITableRef>();
    const accountInComeAmountMxFindTableRef = ref<ITableRef>();
    const accountInComeSheetMxFindTableRef = ref<ITableRef>();
    const accountInComeService = new AccountInComeService();
    const {buttonShowState,updateButtonState} = useButtonState()

    function getHeadTableRowNodeId(data: IAccountInCome) {
      return data.accountInComeId
    }

    const {findDate} = useDateSelect(accountInComeFindDto);

    async function initPage() {
      updateButtonState();
      await accountInComeFindTableRef.value?.initTableData();
      await accountInComeAmountMxFindTableRef.value?.initTableDataList()
      await accountInComeSheetMxFindTableRef.value?.initTableDataList();
    }

    async function setSheetSelected(accountInComeId: number) {
      await accountInComeFindTableRef.value?.getGridApi().getRowNode(String(accountInComeId))?.setSelected(true);
    }

    async function initMxTableData() {
      accountInComeAmountMxFindTableRef.value?.getGridApi().setRowData([]);
      accountInComeSheetMxFindTableRef.value?.getGridApi().setRowData([]);
    }

    async function getSelected(): Promise<IAccountInComeFind> {
      const accountInComeFinds = await accountInComeFindTableRef.value?.getGridApi().getSelectedRows();
      if (accountInComeFinds && accountInComeFinds.length > 0) {
        return accountInComeFinds[0]
      } else {
        return Promise.reject(new VerifyParamError("请先选择单据"))
      }
    }

    //单头表格选中改变
    async function selectionChanged() {
      const accountInCome = await getSelected();
      updateButtonState(accountInCome.level1Review, accountInCome.level2Review);
      await getAccountInComeAmountMx(accountInCome.accountInComeId);
      await getAccountInComeSheetMx(accountInCome.accountInComeId);
    }

    //点击新增按钮
    function clickedCreateBtn() {
      const route = router.resolve({
        name: "accountInComeCreate"
      })

      useRouterPage(route.fullPath, route.meta.title as string);
    }

    //点击编辑按钮
    async function clickedEditBtn() {
      const {accountInComeId} = await getSelected();
      const route = await router.resolve({
        name: "accountInComeEdit",
        query: {
          accountInComeId: String(accountInComeId)
        }
      });

      useRouterPage(route.fullPath, route.meta.title as string)
    }

    //点击删除按钮
    async function clickedDeleteBtn() {
      const {accountInComeCode, amount, accountInComeId} = await getSelected();
      useErpDialog({
        title: "提示",
        message: `是否删除 ${accountInComeCode} 金额:${amount}`,
        ok: async () => {
          await accountInComeService.delete_data({accountInComeId})
          await initPage();
          await initMxTableData();
          updateButtonState();
        }
      })
    }

    //点击审核按钮
    async function clickedLevel1ReviewBtn() {
      const {accountInComeCode, amount, accountInComeId} = await getSelected();
      useErpDialog({
        title: "提示",
        message: `是否审核 ${accountInComeCode} 金额:${amount}`,
        ok: async () => {
          await accountInComeService.level1Review({
            accountInComeId
          });
          await initPage();
          await initMxTableData();
          await setSheetSelected(accountInComeId);
          updateButtonState();
        }
      })
    }

    //点击取消审核按钮
    async function clickedUnLevel1ReviewBtn() {
      const {accountInComeCode, amount, accountInComeId} = await getSelected();
      useErpDialog({
        title: "提示",
        message: `是否撤审 ${accountInComeCode} 金额:${amount}`,
        ok: async () => {
          await accountInComeService.unLevel1Review({accountInComeId});
          await initPage();
          await initMxTableData();
          await setSheetSelected(accountInComeId);
          updateButtonState();
        }
      })
    }

    //获取销售收入单付款明细
    async function getAccountInComeAmountMx(accountInComeId?: number) {
      accountInComeAmountMxFindTableRef.value?.getGridApi().setRowData([]);
      if (accountInComeId) {
        accountInComeAmountMxFindDto.value.accountInComeId = accountInComeId;
        await accountInComeAmountMxFindTableRef.value?.initTableData();
      }
    }

    //获取销售收入单付款明细
    async function getAccountInComeSheetMx(accountInComeId?: number) {
      accountInComeSheetMxFindTableRef.value?.getGridApi().setRowData([]);
      if (accountInComeId) {
        accountInComeSheetMxFindDto.value.accountInComeId = accountInComeId;
        await accountInComeSheetMxFindTableRef.value?.initTableData();
      }
    }

    return {
      defaultAccountInComeTableConfig,
      defaultAccountInComeAmountMxTableConfig,
      defaultAccountInComeSheetMxTableConfig,
      accountInComeFindDto,
      accountInComeAmountMxFindDto,
      accountInComeSheetMxFindDto,
      accountInComeFindTableRef,
      accountInComeAmountMxFindTableRef,
      accountInComeSheetMxFindTableRef,
      buttonShowState,
      findDate,
      activated,
      initPage,
      getHeadTableRowNodeId,
      selectionChanged,
      clickedCreateBtn,
      clickedEditBtn,
      clickedDeleteBtn,
      clickedLevel1ReviewBtn,
      clickedUnLevel1ReviewBtn,
    };
  },
});
</script>
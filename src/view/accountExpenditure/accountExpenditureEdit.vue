<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button :disabled="!state.edit" type="info" @click="clickedSaveButton">保存</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteButton">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedL1ReviewButton">审核
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnL1ReviewBtn">撤审
      </erp-button>
    </erp-no-title>

    <erp-form>
      <erp-form-item v-if="editDto.accountExpenditureCode" lg-col="1" md-col="2" name="单据编号">
        <erp-input-round v-model="editDto.accountExpenditureCode" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="2" md-col="2" name="供应商">
        <erp-select-buy-btn
            :buyname="editDto.buyname"
            :disabled="!state.edit"
            @select="onSelectedBuy" @unSelect="onUnSelectedBuy"></erp-select-buy-btn>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="总金额(自动计算)">
        <erp-input-round v-model="editDto.amount" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="发生日期">
        <el-date-picker v-model="editDto.indate" :disabled="!state.edit" placeholder="选择日期"
                        type="date" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </erp-form-item>
      <erp-form-item lg-col="1" md-col="2" name="备注">
        <erp-input-round v-model="editDto.reMark" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-title title="付款明细">
      <erp-button v-show="state.edit" type="danger" @click="clickedAddAmountMxButton">增加明细</erp-button>
      <erp-button v-show="state.edit" type="info" @click="clickedDeleteAmountMxSelectedButton">删除选中</erp-button>
    </erp-title>

    <erp-table
        ref="accountExpenditureAmountMxTableRef"
        :find-dto="{}"
        :getRowId="getRowNodeIdForAmountMx"
        :table-edit="state.edit"
        :table-state="editAccountExpenditureAmountMxTableConfig"
        @cellValueChanged="onCellValueChangedAmountMx"
    >
    </erp-table>

    <erp-title title="核付明细">
      <erp-button v-show="state.edit" type="danger" @click="clickedAddSheetMx">增加明细</erp-button>
      <erp-button v-show="state.edit" type="info" @click="clickedDeleteSelectedSheetMx">删除选中</erp-button>
    </erp-title>

    <erp-table
        ref="accountExpenditureSheetMxTableRef"
        :find-dto="{}"
        :table-edit="state.edit"
        :table-state="editAccountExpenditureSheetMxTableConfig"
    >
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {defineComponent, onMounted, ref} from "vue";
import {AccountExpenditureCreateDto} from "@/module/accountExpenditure/dto/accountExpenditureCreate.dto";
import {
  editAccountExpenditureAmountMxTableConfig
} from "@/view/accountExpenditure/config/editAccountExpenditureAmountMxTableConfig";
import {
  editAccountExpenditureSheetMxTableConfig
} from "@/view/accountExpenditure/config/editAccountExpenditureSheetMxTableConfig";
import {ITableRef} from "@/components/table/type";
import {IBuy} from "@/module/buy/buy";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {AccountExpenditureService} from "@/module/accountExpenditure/accountExpenditure.service";
import {AccountExpenditureUpdateDto} from "@/module/accountExpenditure/dto/accountExpenditureUpdate.dto";
import {AccountExpenditureAmountMxService} from "@/module/accountExpenditure/accountExpenditureAmountMx.service";
import {AccountExpenditureSheetMxCreateDto} from "@/module/accountExpenditure/dto/accountExpenditureSheetMxCreate.dto";
import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";
import {AccountExpenditureSheetMxService} from "@/module/accountExpenditure/accountExpenditureSheetMx.service";
import {AccountCategoryType} from "@/types/AccountCategoryType";
import {getButtonState, IButtonState} from "@/composables/useSheetButtonState";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {tabMenu} from "@/components/router_tab/useRouterTab";
import {useRouterPage} from "@/utils";
import useErpDialog from "@/components/dialog/useErpDialog";
import {
  useErpSelectAccountPayableDialog
} from "@/components/dialog/selectInfo/accountPayable/useErpSelectAccountPayableDialog";
import * as mathjs from 'mathjs';
import ErpForm from "@/components/form/ErpForm.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpSelectBuyBtn from "@/components/button/ErpSelectBuyBtn.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import {AccountExpenditureFindDto} from "@/module/accountExpenditure/dto/accountExpenditureFind.dto";
import { GetRowIdParams } from "ag-grid-community";

export default defineComponent({
  name: "AccountExpenditureEdit",
  components: {
    ErpForm,
    ErpTable,
    ErpTitle,
    ErpNoTitle,
    ErpButton,
    ErpFormItem,
    ErpDelimiter,
    ErpInputRound,
    ErpSelectBuyBtn,
    ErpPageBox
  },
  setup() {
    onMounted(async () => {
      await initPage();
    })

    const {bignumber, chain, round} = mathjs;
    const route = useRoute();
    const router = useRouter();
    //页面状态
    const state = ref({
      title: '新增采购付款单',
      edit: true,
      accountExpenditureId: Number(route.query.accountExpenditureId || 0)
    })

    const buttonShowState = ref<IButtonState>({
      create: true,
      edit: false,
      level1review: true,
      un_level1review: false,
      level2review: false,
      un_level2review: false,
      delete_data: false
    });

    //编辑中的dto
    const editDto = ref(new AccountExpenditureCreateDto());
    //付款明细表ref
    const accountExpenditureAmountMxTableRef = ref<ITableRef>();
    //核销明细表ref
    const accountExpenditureSheetMxTableRef = ref<ITableRef>();
    //service
    const accountExpenditureService = new AccountExpenditureService();

    //hock ----------------------------------------

    //付款明细表设置id
    function getRowNodeIdForAmountMx(params: GetRowIdParams<IAccountExpenditureAmountMx>) : string{
      return String(params.data.printId)
    }

    //页面初始化
    async function initPage() {
      //编辑模式
      if (state.value.accountExpenditureId !== 0) {
        const accountExpenditureHead = await initHeadData(state.value.accountExpenditureId)
        buttonShowState.value = getButtonState(accountExpenditureHead.level1Review, accountExpenditureHead.level2Review);

        state.value.edit = accountExpenditureHead.level1Review + accountExpenditureHead.level2Review === 0;

        editDto.value = new AccountExpenditureUpdateDto(accountExpenditureHead);
        editDto.value.buyname = accountExpenditureHead.buyname;
        await addAmountMx(await initAmountMxTableData(state.value.accountExpenditureId));
        await addSheetMx(await initSheetMxTableData(state.value.accountExpenditureId));
      } else {
        state.value.edit = true;
      }
    }

    //添加付款明细
    function addAmountMx(accountExpenditureAmountMxList?: IAccountExpenditureAmountMx[]) {
      if (accountExpenditureAmountMxList && accountExpenditureAmountMxList.length > 0) {
        for (let i = 0; i < accountExpenditureAmountMxList.length; i++) {
          const accountExpenditureAmountMx = accountExpenditureAmountMxList[i];
          addAmountMxNumberOfTime = addAmountMxNumberOfTime + 1;
          accountExpenditureAmountMx.printId = addAmountMxNumberOfTime;
        }
      }
      accountExpenditureAmountMxTableRef.value?.getGridApi().applyTransaction({add: accountExpenditureAmountMxList});
    }

//添加核销明细
    function addSheetMx(accountExpenditureSheetMxList?: IAccountExpenditureSheetMx[]) {
      if (accountExpenditureSheetMxList && accountExpenditureSheetMxList.length > 0) {
        for (let i = 0; i < accountExpenditureSheetMxList.length; i++) {
          addSheetMxNumberOfTime = accountExpenditureSheetMxList[i].printId
        }
      }

      accountExpenditureSheetMxTableRef.value?.getGridApi().applyTransaction({add: accountExpenditureSheetMxList})
    }

    //获取收款明细
    function getAmountMxDataForTable() {
      const accountExpenditureAmountMx: IAccountExpenditureAmountMx[] = [];
      accountExpenditureAmountMxTableRef.value?.getGridApi().forEachNode((rowNode, index) => {
        if (rowNode.data.accountId) {
          rowNode.data.printid = index + 1;
          rowNode.data.amount = Number(rowNode.data.amount);
          accountExpenditureAmountMx.push(rowNode.data);
        }
      })
      return accountExpenditureAmountMx
    }

    //获取核销明细表格
    function getSheetMxDataForTable() {
      const accountExpenditureSheetMxList: IAccountExpenditureSheetMx[] = [];
      accountExpenditureSheetMxTableRef.value?.getGridApi().forEachNode((rowNode, index) => {
        if (rowNode.data.correlationId) {
          rowNode.data.printid = index + 1;
          rowNode.data.amountsMantissa = Number(rowNode.data.amountsMantissa);
          rowNode.data.amountsThisVerify = Number(rowNode.data.amountsThisVerify);
          accountExpenditureSheetMxList.push(rowNode.data);
        }
      })
      return accountExpenditureSheetMxList;
    }

    //按付款单id获取核销明细
    async function initHeadData(accountExpenditureId: number) {
      const accountExpenditureFindDto = new AccountExpenditureFindDto();
      accountExpenditureFindDto.accountExpenditureId = accountExpenditureId;
      const accountExpenditureList = await accountExpenditureService.find(accountExpenditureFindDto);

      if (accountExpenditureList.length !== 1) {
        return Promise.reject(new VerifyParamError('查无此单'));
      }

      return accountExpenditureList[0];
    }

    //获取付款明细
    async function initAmountMxTableData(accountExpenditureId?: number) {
      if (accountExpenditureId) {
        const accountExpenditureAmountMxService = new AccountExpenditureAmountMxService();
        return await accountExpenditureAmountMxService.find({accountExpenditureId: accountExpenditureId});
      } else {
        await accountExpenditureAmountMxTableRef.value?.initTableDataList();
      }
    }

    //获取付款单核销明细
    async function initSheetMxTableData(accountExpenditureId?: number) {
      if (accountExpenditureId) {
        const accountExpenditureSheetMxService = new AccountExpenditureSheetMxService();
        return await accountExpenditureSheetMxService.find({accountExpenditureId: accountExpenditureId});
      } else {
        await accountExpenditureSheetMxTableRef.value?.initTableDataList();
      }
    }

    //取消编辑状态
    function cancelEditStatus() {
      accountExpenditureAmountMxTableRef.value?.getGridApi().stopEditing();
      accountExpenditureSheetMxTableRef.value?.getGridApi().stopEditing();
    }

    // event ----------------------------------------------

    //选择供应商资料事件
    async function onSelectedBuy(buy: IBuy) {
      editDto.value.buyid = buy.buyid;
      editDto.value.buyname = buy.buyname;
    }

    //取消选择供应商事件
    async function onUnSelectedBuy() {
      editDto.value.buyid = 0;
      editDto.value.buyname = "";
      editDto.value.amount = 0;
      await accountExpenditureAmountMxTableRef.value?.getGridApi().setRowData([]);

      await accountExpenditureSheetMxTableRef.value?.getGridApi().setRowData([]);
    }

    //AmountMx表 单元格值更改
    function onCellValueChangedAmountMx() {
      const accountExpenditureAmountMxList = getAmountMxDataForTable();
      let amounts: number = 0;
      for (let i = 0; i < accountExpenditureAmountMxList.length; i++) {
        const accountExpenditureAmountMx = accountExpenditureAmountMxList[i];

        amounts = Number(
            round(
                chain(bignumber(amounts))
                    .add(bignumber(accountExpenditureAmountMx.amount))
                    .done()
                , 4)
        )
      }
      editDto.value.amount = amounts;
    }

    //付款明细增加明细次数
    let addAmountMxNumberOfTime: number = 0;

    //增加明细
    async function clickedAddAmountMxButton(accountExpenditureAmountMxList?: IAccountExpenditureAmountMx[]) {

      if (!editDto.value.buyid || editDto.value.buyid === 0) {
        return Promise.reject(new VerifyParamError('请选择供应商'))
      }

      //增加次数
      addAmountMxNumberOfTime = addAmountMxNumberOfTime + 1;
      //创建明细
      const accountExpenditureAmountMx: IAccountExpenditureAmountMx = {
        accountExpenditureAmountMxId: 0,
        accountExpenditureId: 0,
        accountId: 0,
        amount: 0,
        payee: editDto.value.buyname ? editDto.value.buyname : "",
        printId: addAmountMxNumberOfTime,
        reMark1: "",
        reMark2: "",
        reMark3: "",
        receivingAccount: ""
      }

      accountExpenditureAmountMxList = [accountExpenditureAmountMx];

      //添加进表
      accountExpenditureAmountMxTableRef.value?.getGridApi().applyTransaction({add: accountExpenditureAmountMxList});
    }

    //核销明细增加明细次数
    let addSheetMxNumberOfTime: number = 0;

    //增加核销明细
    function addSheetMxForAccountPayable(accountsPayableList: IAccountsPayableFind[]) {
      const accountExpenditureSheetMxList_existing = getSheetMxDataForTable();
      const accountExpenditureSheetMxList: IAccountExpenditureSheetMx[] = [];
      for (let i = 0; i < accountsPayableList.length; i++) {

        const accountsPayable = accountsPayableList[i];

        //判断是否已经存在
        for (let j = 0; j < accountExpenditureSheetMxList_existing.length; j++) {
          if (accountExpenditureSheetMxList_existing[i].correlationId === accountsPayable.accountsPayableId &&
              accountExpenditureSheetMxList_existing[i].correlationType === accountsPayable.accountsPayableType
          ) {
            useErpDialog({
              title: '错误提示',
              message: '选择的应付账款存在重复添加',
              closeBtnVisible: false
            })
            return
          }
        }

        const accountExpenditureSheetMx = new AccountExpenditureSheetMxCreateDto({
          accountExpenditureId: 0,
          accountExpenditureSheetMxId: 0,
          amounts: accountsPayable.amounts,
          amountsMantissa: 0,
          amountsThisVerify: 0,
          amountsNotVerify: accountsPayable.notCheckAmounts,
          amountsVerified: accountsPayable.checkedAmounts,
          correlationId: accountsPayable.accountsPayableId,
          correlationType: accountsPayable.accountsPayableType,
          printId: addSheetMxNumberOfTime
        })

        accountExpenditureSheetMx.correlationCode = accountsPayable.correlationCode;
        accountExpenditureSheetMxList.push(accountExpenditureSheetMx);
        addSheetMxNumberOfTime = addSheetMxNumberOfTime + 1
      }

      accountExpenditureSheetMxTableRef.value?.getGridApi().applyTransaction({add: accountExpenditureSheetMxList})
    }

    //删除付款明细
    function clickedDeleteAmountMxSelectedButton() {
      const removeData = accountExpenditureAmountMxTableRef.value?.getGridApi().getSelectedRows();
      accountExpenditureAmountMxTableRef.value?.getGridApi().applyTransaction({remove: removeData});
    }

    //删除核销明细
    function clickedDeleteSelectedSheetMx() {
      const removeData = accountExpenditureSheetMxTableRef.value?.getGridApi().getSelectedRows();
      accountExpenditureSheetMxTableRef.value?.getGridApi().applyTransaction({remove: removeData});
    }

    //点击增加明细按钮(sheetMx)
    async function clickedAddSheetMx() {
      if (!editDto.value.buyid || editDto.value.buyid === 0) {
        return Promise.reject(new VerifyParamError('请选择供应商'));
      }

      useErpSelectAccountPayableDialog({
            buyid: editDto.value.buyid,
            ok: (accountsPayableList: IAccountsPayableFind[]) => {
              addSheetMxForAccountPayable(accountsPayableList);
            },
            accountsPayableTypeList: [AccountCategoryType.accountsPayable4, AccountCategoryType.otherPayable6]
          }
      )
    }

    //单击保存按钮
    async function clickedSaveButton() {
      cancelEditStatus();
      onCellValueChangedAmountMx();

      const accountExpenditureAmountMxList = getAmountMxDataForTable();

      if (accountExpenditureAmountMxList.length === 0) {
        return Promise.reject(new VerifyParamError('付款明细为空'));
      }

      editDto.value.accountExpenditureAmountMx = accountExpenditureAmountMxList;
      editDto.value.accountExpenditureSheetMx = getSheetMxDataForTable();

      if (state.value.accountExpenditureId === 0) {
        const createResult = await accountExpenditureService.create(editDto.value);
        state.value.accountExpenditureId = createResult.id;

        tabMenu.closeTab(route.fullPath)
        const newRoute = router.resolve({
          name: "accountExpenditureEdit", query: {
            accountExpenditureId: state.value.accountExpenditureId
          }
        });
        useRouterPage(newRoute.fullPath, newRoute.meta.title as string);

      } else {
        await accountExpenditureService.update(editDto.value);
        await initAmountMxTableData()
        await initSheetMxTableData()
        await initPage();
      }


    }

    //单击删除按钮
    async function clickedDeleteButton() {
      const {accountExpenditureCode, amount, accountExpenditureId} = await editDto.value;
      useErpDialog({
        title: "提示",
        message: `是否删除单据${accountExpenditureCode},金额:${amount}`,
        ok: async () => {
          //删除支出单
          await accountExpenditureService.delete_data({accountExpenditureId});
          //关闭
          //跳转
          tabMenu.closeTab(route.fullPath)
          const newRoute = router.resolve({
            name: "accountExpenditureFind"
          });
          useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
        }
      })
    }

    //单击审核按钮
    async function clickedL1ReviewButton() {
      cancelEditStatus();
      onCellValueChangedAmountMx();
      editDto.value.accountExpenditureAmountMx = getAmountMxDataForTable();
      editDto.value.accountExpenditureSheetMx = getSheetMxDataForTable();
      const {accountExpenditureCode, amount, accountExpenditureId} = await editDto.value;
      if (accountExpenditureId) {
        useErpDialog({
          title: "提示",
          message: `是否审核单据${accountExpenditureCode},金额:${amount}`,
          ok: async () => {
            await accountExpenditureService.update_l1Review(editDto.value);
            await initAmountMxTableData();
            await initSheetMxTableData();
            await initPage();
          }
        })
      } else {
        editDto.value.accountExpenditureAmountMx = getAmountMxDataForTable();
        editDto.value.accountExpenditureSheetMx = getSheetMxDataForTable();
        useErpDialog({
          title: "提示",
          message: `是否保存审核单据,金额:${amount}`,
          ok: async () => {
            const createResult = await accountExpenditureService.create_l1Review(editDto.value);

            if (createResult && createResult.id) {
              state.value.accountExpenditureId = createResult.id;

              tabMenu.closeTab(route.fullPath)
              const newRoute = router.resolve({
                name: "accountExpenditureEdit", query: {
                  accountExpenditureId: state.value.accountExpenditureId
                }
              });
              useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
            }
          }
        })
      }
    }

    //单击撤审按钮
    async function clickedUnL1ReviewBtn() {
      const {accountExpenditureCode, amount, accountExpenditureId} = await editDto.value;
      useErpDialog({
        title: "提示",
        message: `是否撤审单据${accountExpenditureCode},金额:${amount}`,
        ok: async () => {
          await accountExpenditureService.unLevel1Review({accountExpenditureId});
          await initAmountMxTableData();
          await initSheetMxTableData();
          await initPage();
        }
      })
    }

    return {
      accountExpenditureAmountMxTableRef,
      accountExpenditureSheetMxTableRef,
      state,
      buttonShowState,
      editDto,
      editAccountExpenditureAmountMxTableConfig,
      editAccountExpenditureSheetMxTableConfig,
      getRowNodeIdForAmountMx,
      clickedAddAmountMxButton,
      onSelectedBuy,
      onUnSelectedBuy,
      onCellValueChangedAmountMx,
      clickedDeleteAmountMxSelectedButton,
      clickedDeleteSelectedSheetMx,
      clickedAddSheetMx,
      clickedSaveButton,
      clickedDeleteButton,
      clickedL1ReviewButton,
      clickedUnL1ReviewBtn
    }
  }
})
</script>
<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button v-reqClick="clickedSaveBtn" :disabled="!state.edit" type="info">保存</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteBtn">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedLevel1ReviewBtn">审核
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnLevel1ReviewBtn">撤审
      </erp-button>
    </erp-no-title>
    <erp-form>
      <erp-form-item v-if="editDto.accountInComeCode" label-for-name="单据编号" lg-col="1" md-col="2">
        <erp-input-round v-model="editDto.accountInComeCode" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="客户" lg-col="2" md-col="2">
        <erp-select-client-btn :clientname="editDto.clientname" :disabled="!state.edit" @select="onSelectClient"
                               @unSelect="onUnSelectClient">
        </erp-select-client-btn>
      </erp-form-item>
      <erp-form-item label-for-name="总金额(自动计算)" lg-col="1" md-col="2">
        <erp-input-round v-model="editDto.amount" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="发生日期" lg-col="1" md-col="2">
        <el-date-picker v-model="editDto.indate" :disabled="!state.edit" placeholder="选择日期" type="datetime"
                        value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </erp-form-item>
      <erp-form-item label-for-name="备注" lg-col="1" md-col="2">
        <erp-input-round v-model="editDto.reMark" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-title title="收款明细">
      <template #default>
        <erp-button v-show="state.edit" @click="clickedAddAmountMx">增加明细</erp-button>
        <erp-button v-show="state.edit" type="danger" @click="clickedDeleteSelectAmountMx">删除明细</erp-button>
      </template>
    </erp-title>

    <erp-table ref="editAccountInComeAmountMxTableRef" :find-dto="{}" :getRowNodeId="getRowNodeIdForAmountMx"
               :table-edit="state.edit" :table-state="editAccountInComeAmountMxTableConfig"
               @cellValueChanged="cellValueChangedAmountMx" @selection-changed="">
    </erp-table>

    <erp-title title="核销明细">
      <template #default>
        <erp-button v-show="state.edit" @click="clickedSelectSheetMx">增加明细</erp-button>
        <erp-button v-show="state.edit" type="danger" @click="clickedDeleteSheetMx">删除明细</erp-button>
      </template>
    </erp-title>

    <erp-table ref="editAccountInComeSheetMxTableRef" :find-dto="{}" :getRowNodeId="getRowNodeIdForSheetMx"
               :table-edit="state.edit" :table-state="editAccountInComeSheetMxTableConfig" @cellValueChanged=""
               @selection-changed="">
    </erp-table>
  </erp-page-box>


</template>

<script lang="ts">
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpForm from "@/components/form/ErpForm.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import {defineComponent, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {AccountInComeCreateDto} from "@/module/accountInCome/dto/accountInComeCreate.dto";
import {IAccountInComeCreateDto} from "@/module/accountInCome/accountInCome";
import {IClient} from "@/module/client/client";
import {ITableRef} from "@/components/table/type";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";
import {editAccountInComeAmountMxTableConfig} from "@/view/accountInCome/config/editAccountInComeAmountMxTableConfig";
import {editAccountInComeSheetMxTableConfig} from "@/view/accountInCome/config/editAccountInComeSheetMxTableConfig";
import {AccountInComeSheetMxCreateDto} from "@/module/accountInCome/dto/sheetMx/accountInComeSheetMxCreate.dto";
import * as mathjs from 'mathjs';
import {AccountInComeService} from "@/module/accountInCome/accountInCome.service";
import {useErpSelectAccountReceivableDialog} from "@/components/dialog/selectInfo/accountReceivable/useErpSelectAccountReceivableDialog";
import {IAccountsReceivableFind} from "@/module/accountReceivable/accountReceivable";
import {AccountInComeAmountMxCreateDto} from "@/module/accountInCome/dto/amountMx/accountInComeAmountMxCreate.dto";
import useErpDialog from "@/components/dialog/useErpDialog";
import {AccountInComeUpdateDto} from "@/module/accountInCome/dto/accountInComeUpdate.dto";
import {AccountInComeAmountMxService} from "@/module/accountInCome/accountInComeAmountMx.service";
import {AccountInComeSheetMxService} from "@/module/accountInCome/accountInComeSheetMx.service";
import {AccountCategoryType} from "@/types/AccountCategoryType";
import {getToday, useRouterPage} from "@/utils";
import {useButtonState} from "@/composables/useButtonState";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {tabMenu} from "@/components/router_tab/useRouterTab";

export default defineComponent({
  name: "accountInComeEdit",
  components: {
    ErpTitle,
    ErpButton,
    ErpPageBox,
    ErpNoTitle,
    ErpDelimiter,
    ErpTable,
    ErpForm,
    ErpFormItem,
    ErpInputRound,
    ErpSelectClientBtn,
  },
  setup() {
    const {bignumber, chain, round} = mathjs;
    const router = useRouter();
    const route = useRoute();
    const {buttonShowState, updateButtonState} = useButtonState();
    const editAccountInComeAmountMxTableRef = ref<ITableRef>();
    const editAccountInComeSheetMxTableRef = ref<ITableRef>();
    const editDto = ref<IAccountInComeCreateDto>(new AccountInComeCreateDto({
      accountInComeCode: "",
      accountInComeId: 0,
      accountInComeType: 0,
      amount: 0,
      clientid: 0,
      clientname: "",
      createdAt: null,
      creater: "",
      del_uuid: 0,
      deletedAt: null,
      deleter: "",
      indate: getToday(),
      level1Date: null,
      level1Name: "",
      level1Review: 0,
      level2Date: null,
      level2Name: "",
      level2Review: 0,
      reMark: "",
      updatedAt: null,
      updater: ""
    }));

    const accountInComeService = new AccountInComeService();
    const accountInComeAmountMxService = new AccountInComeAmountMxService();
    const accountInComeSheetMxService = new AccountInComeSheetMxService();

    function getRowNodeIdForAmountMx(accountInComeAmountMx: IAccountInComeAmountMx) {
      return accountInComeAmountMx.printId
    }

    function getRowNodeIdForSheetMx(accountInComeSheetMxFind: IAccountInComeSheetMxFind) {
      return accountInComeSheetMxFind.printId
    }

    const state = ref({
      edit: true
    })

    onMounted(async () => {
      await initPage();
    })

    async function initPage() {
      if (editDto.value.accountInComeId === 0) {
        editDto.value.accountInComeId = Number(route.query.accountInComeId || 0);
      }

      if (editDto.value.accountInComeId !== 0) {
        //按销售收款单id查询收款明细和核销明细
        const accountInCome = await accountInComeService.find({
          accountInComeCode: "",
          accountInComeId: editDto.value.accountInComeId,
          accountInComeType: 0,
          amount: 0,
          clientid: 0,
          endDate: "",
          page: 0,
          pagesize: 0,
          paymentAccount: "",
          startDate: ""
        });


        const accountInComeAmountMxList = await accountInComeAmountMxService.find({accountInComeId: editDto.value.accountInComeId});
        //初始化 AmountMx printId顺序号
        for (let i = 0; i < accountInComeAmountMxList.length; i++) {
          if (accountInComeAmountMxList[i].printId >= addAmountMxCount) {
            addAmountMxCount = accountInComeAmountMxList[i].printId
          }
        }

        //初始化SheetMx Table printId顺序号
        const accountInComeSheetMxList = await accountInComeSheetMxService.find({accountInComeId: editDto.value.accountInComeId})
        for (let i = 0; i < accountInComeSheetMxList.length; i++) {
          if (accountInComeSheetMxList[i].printId >= addSheetMxCount) {
            addSheetMxCount = accountInComeSheetMxList[i].printId
          }
        }

        editDto.value = new AccountInComeUpdateDto(accountInCome[0]);
        if (editDto.value.level1Review + editDto.value.level2Review === 0) {
          state.value.edit = true;
          updateButtonState(editDto.value.level1Review, editDto.value.level2Review);
        } else {
          state.value.edit = false;
          updateButtonState(editDto.value.level1Review, editDto.value.level2Review);
        }
        addAmountMx(accountInComeAmountMxList);
        addSheetMx(accountInComeSheetMxList);
      } else {
        state.value.edit = true;
      }

    }

    async function initAmountMx() {
      await editAccountInComeAmountMxTableRef.value?.initTableDataList();
    }

    async function initSheetMx() {
      await editAccountInComeSheetMxTableRef.value?.initTableDataList();
    }

    function onSelectClient(client: IClient) {
      editDto.value.clientname = client.clientname;
      editDto.value.clientid = client.clientid;
    }

    function onUnSelectClient() {
      editDto.value.clientname = "";
      editDto.value.clientid = 0;
      deleteAmountMx(getAmountMx())
    }

    async function clickedSaveBtn() {
      await cancelTableEditing();
      editDto.value.accountInComeAmountMx = getAmountMx();
      editDto.value.accountInComeSheetMx = getSheetMx();

      if (editDto.value.clientid === 0) {
        return Promise.reject(new VerifyParamError('请选择客户'));
      }

      if (editDto.value.accountInComeAmountMx.length === 0) {
        return Promise.reject(new VerifyParamError('付款明细为空'));
      }

      if (editDto.value.accountInComeId === 0) {
        const createResult = await accountInComeService.create(editDto.value);

        if (createResult && createResult.id) {
          editDto.value.accountInComeId = createResult.id;

          tabMenu.closeTab(route.fullPath)
          const newRoute = router.resolve({
            name: "accountInComeEdit", query: {
              accountInComeId: editDto.value.accountInComeId
            }
          });
          useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
        }

      } else {
        await accountInComeService.update(editDto.value);
        await initAmountMx();
        await initSheetMx()
        await initPage();
      }

      useErpDialog({
        title: '提示',
        message: '保存成功',
        closeBtnVisible: false
      })
    }

    //点击删除按钮
    async function clickedDeleteBtn() {
      const {accountInComeCode, accountInComeId} = editDto.value;
      useErpDialog({
        title: "提示",
        message: `是否删除 ${accountInComeCode}`,
        ok: async () => {
          await accountInComeService.delete_data({
            accountInComeId
          })

          //跳转
          tabMenu.closeTab(route.fullPath)
          const newRoute = router.resolve({
            name: "accountInComeFind"
          });
          useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
        }
      })
    }

    //点击审核按钮
    async function clickedLevel1ReviewBtn() {
      await cancelTableEditing();

      editDto.value.accountInComeAmountMx = getAmountMx();
      editDto.value.accountInComeSheetMx = getSheetMx();

      if (editDto.value.accountInComeId !== 0) {
        const {accountInComeCode} = editDto.value;
        useErpDialog({
          title: "提示",
          message: `是否审核 ${accountInComeCode}`,
          ok: async () => {
            await accountInComeService.update_l1Review(editDto.value);

            await initAmountMx();
            await initSheetMx()
            await initPage();

            updateButtonState(editDto.value.level1Review, editDto.value.level2Review);
          }
        })
      } else {
        useErpDialog({
          title: "提示",
          message: `是否保存并审核`,
          ok: async () => {
            const createResult = await accountInComeService.create_l1Review(editDto.value);

            if (createResult && createResult.id) {
              editDto.value.accountInComeId = createResult.id;
              tabMenu.closeTab(route.fullPath)
              const newRoute = router.resolve({
                name: "accountInComeEdit", query: {
                  accountInComeId: editDto.value.accountInComeId
                }
              });
              useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
            }

          }
        })
      }
    }

    //点击取消审核按钮
    async function clickedUnLevel1ReviewBtn() {
      const {accountInComeCode, amount, accountInComeId} = editDto.value;
      useErpDialog({
        title: "提示",
        message: `是否撤审 ${accountInComeCode} 金额:${amount}`,
        ok: async () => {
          await accountInComeService.unLevel1Review({accountInComeId});

          await initAmountMx();
          await initSheetMx()
          await initPage();
          updateButtonState(editDto.value.level1Review, editDto.value.level2Review);
        }
      })
    }

    let addAmountMxCount = 0;

    //添加收款明细
    function clickedAddAmountMx() {
      if (editDto.value.clientid === 0) {
        return Promise.reject(new VerifyParamError('请选择客户'))
      }
      addAmountMxCount = addAmountMxCount + 1;
      const accountInComeAmountMx = new AccountInComeAmountMxCreateDto({
        accountId: 0,
        accountInComeAmountMxId: 0,
        accountInComeId: 0,
        accountsReceivable: 0,
        amount: 0,
        currencyid: 0,
        exchangeRate: 1,
        payer: editDto.value.clientname ? editDto.value.clientname : "",
        paymentAccount: "",
        printId: addAmountMxCount,
        reMack1: "",
        reMack2: "",
        reMack3: "",
        settlementMethod: ""
      });
      addAmountMx([accountInComeAmountMx])
    }

    //删除选中付款明细
    function clickedDeleteSelectAmountMx() {
      deleteAmountMx(getSelectedAmountMx());
    }

    //增加收款明细
    function addAmountMx(accountInComeAmountMxList: IAccountInComeAmountMx[]) {
      editAccountInComeAmountMxTableRef.value?.getGridApi().applyTransaction({add: accountInComeAmountMxList})
    }

    //获取收款明细
    function getAmountMx() {
      const accountInComeAmountMxList: IAccountInComeAmountMx[] = []
      editAccountInComeAmountMxTableRef.value?.getGridApi().forEachNode((rowNode) => {
        accountInComeAmountMxList.push(rowNode.data);
      })

      return accountInComeAmountMxList
    }

    let addSheetMxCount: number = 0

    //选择核销明细
    function clickedSelectSheetMx() {
      if (editDto.value.clientid === 0) {
        return Promise.reject(new VerifyParamError('请选择客户'))
      }

      useErpSelectAccountReceivableDialog({
        clientid: editDto.value.clientid,
        ok: (accountsReceivableFindList: IAccountsReceivableFind[]) => {
          const accountInComeSheetMxList: IAccountInComeSheetMxFind[] = [];
          for (let i = 0; i < accountsReceivableFindList.length; i++) {
            addSheetMxCount = addSheetMxCount + 1
            const accountsReceivableFind = accountsReceivableFindList[i]
            const accountInComeSheetMx: IAccountInComeSheetMxFind = new AccountInComeSheetMxCreateDto({
              accountInComeId: 0,
              accountInComeSheetMxId: 0,
              amounts: accountsReceivableFind.amounts,
              amountsNotVerify: accountsReceivableFind.notCheckAmounts,
              amountsVerified: accountsReceivableFind.checkedAmounts,
              amountsMantissa: 0,
              amountsThisVerify: 0,
              correlationId: accountsReceivableFind.accountsReceivableId,
              correlationType: accountsReceivableFind.accountsReceivableType,
              correlationCode: accountsReceivableFind.correlationCode,
              printId: addSheetMxCount
            })
            accountInComeSheetMxList.push(accountInComeSheetMx)
          }

          addSheetMx(accountInComeSheetMxList);
        },
        accountsReceivableTypeList: [AccountCategoryType.accountsReceivable1, AccountCategoryType.otherReceivables3]

      })
    }

    //删除核销明细
    function clickedDeleteSheetMx() {
      deleteSheetMx(getSelectedSheetMx());
    }

    //获取选择收款明细
    function getSelectedAmountMx() {
      return editAccountInComeAmountMxTableRef.value?.getGridApi().getSelectedRows();
    }

    //删除收款明细
    function deleteAmountMx(selectedRow: any) {
      editAccountInComeAmountMxTableRef.value?.getGridApi().applyTransaction({remove: selectedRow});
    }

    //添加核销明细
    function addSheetMx(accountInComeSheetMxFindList: IAccountInComeSheetMxFind[]) {
      const accountInComeSheetMxList_existing = getSheetMx();
      //与现在已有比较
      for (let i = 0; i < accountInComeSheetMxList_existing.length; i++) {
        const accountInComeSheetMx_existing = accountInComeSheetMxList_existing[i];

        for (let j = 0; j < accountInComeSheetMxFindList.length; j++) {
          const accountInComeSheetMx = accountInComeSheetMxFindList[j]
          if (accountInComeSheetMx_existing.correlationId === accountInComeSheetMx.correlationId &&
              accountInComeSheetMx_existing.correlationType === accountInComeSheetMx.correlationType
          ) {
            useErpDialog({
              title: '错误提示',
              message: '选择的应收账款存在重复添加',
              closeBtnVisible: false
            })
            return
          }
        }
      }
      editAccountInComeSheetMxTableRef.value?.getGridApi().applyTransaction({add: accountInComeSheetMxFindList})
    }

    //获取选中核销明细
    function getSheetMx(): IAccountInComeSheetMxFind[] {
      const accountInComeSheetMxList: IAccountInComeSheetMxFind[] = [];
      editAccountInComeSheetMxTableRef.value?.getGridApi().forEachNode((rowNode, index) => {
        if (rowNode.data.correlationId) {
          rowNode.data.printid = index + 1;
          rowNode.data.amountsMantissa = Number(rowNode.data.amountsMantissa);
          rowNode.data.amountsThisVerify = Number(rowNode.data.amountsThisVerify);
          accountInComeSheetMxList.push(rowNode.data);
        }
      })
      return accountInComeSheetMxList
    }

    //获取选中核销明细
    function getSelectedSheetMx() {
      return editAccountInComeSheetMxTableRef.value?.getGridApi().getSelectedRows();
    }

    //删除核销明细
    function deleteSheetMx(selectedRow: any) {
      editAccountInComeSheetMxTableRef.value?.getGridApi().applyTransaction({remove: selectedRow});
    }

    //取消表格编辑状态
    function cancelTableEditing() {
      editAccountInComeAmountMxTableRef.value?.getGridApi().stopEditing();
      editAccountInComeSheetMxTableRef.value?.getGridApi().stopEditing();
    }

    //amountMx table value 刷新后
    function cellValueChangedAmountMx() {
      const accountInComeAmountMxeList = getAmountMx();
      let amounts: number = 0;
      for (let i = 0; i < accountInComeAmountMxeList.length; i++) {
        const accountInComeAmountMx = accountInComeAmountMxeList[i];

        amounts = Number(
            round(
                chain(bignumber(amounts))
                    .add(bignumber(accountInComeAmountMx.amount))
                    .done()
                , 4)
        )
      }
      editDto.value.amount = amounts;
    }

    return {
      editAccountInComeAmountMxTableConfig,
      editAccountInComeSheetMxTableConfig,
      tabMenu,
      buttonShowState,
      editAccountInComeAmountMxTableRef,
      editAccountInComeSheetMxTableRef,
      editDto,
      getRowNodeIdForAmountMx,
      getRowNodeIdForSheetMx,
      state,
      onSelectClient,
      onUnSelectClient,
      clickedSaveBtn,
      clickedDeleteBtn,
      clickedLevel1ReviewBtn,
      clickedUnLevel1ReviewBtn,
      clickedAddAmountMx,
      clickedDeleteSelectAmountMx,
      clickedSelectSheetMx,
      clickedDeleteSheetMx,
      cellValueChangedAmountMx,
    };
  },
});
</script>

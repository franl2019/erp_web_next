<template>
  <erp-page-box>
    <erp-no-title>
      <erp-button v-reqClick="clickedSaveButton" :disabled="!state.edit" type="info">保存</erp-button>
      <erp-button :disabled="!buttonShowState.delete_data" type="danger" @click="clickedDeleteButton">删除</erp-button>
      <erp-delimiter/>
      <erp-button :disabled="!buttonShowState.level1review" type="success" @click="clickedL1ReviewButton">审核
      </erp-button>
      <erp-button :disabled="!buttonShowState.un_level1review" type="danger" @click="clickedUnL1ReviewButton">撤审
      </erp-button>
    </erp-no-title>

    <erp-form>
      <erp-form-item v-if="editDto.accountsVerifySheetCode" label-for-name="单号" lg-col="1" md-col="2">
        <erp-input-round v-model="editDto.accountsVerifySheetCode" disabled></erp-input-round>
      </erp-form-item>
      <erp-form-item label-for-name="核销类型" lg-col="1" md-col="2">
        <erp-accounts-verify-sheet-type-select v-model="editDto.sheetType"
                                               :disabled="!state.edit"
                                               @change="refreshFromSheetType(editDto.sheetType)">
        </erp-accounts-verify-sheet-type-select>
      </erp-form-item>
      <erp-form-item label-for-name="发生日期" lg-col="1" md-col="2">
        <el-date-picker v-model="editDto.inDate" :disabled="!state.edit" placeholder="选择日期" type="date"
                        value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
      </erp-form-item>
      <erp-form-item v-if="inputVisible.client" label-for-name="客户" lg-col="2" md-col="2">
        <erp-select-client-btn :clientname="editDto.clientname" :disabled="!state.edit" @select="onSelectClient"
                               @unSelect="onUnSelectClient"></erp-select-client-btn>
      </erp-form-item>
      <erp-form-item v-if="inputVisible.client_b" label-for-name="转入客户" lg-col="2" md-col="2">
        <erp-select-client-btn :clientname="editDto.clientname_b" :disabled="!state.edit"
                               @select="onSelectClient_b" @unSelect="onUnSelectClient_b"></erp-select-client-btn>
      </erp-form-item>
      <erp-form-item v-if="inputVisible.buy" label-for-name="供应商" lg-col="2" md-col="2">
        <erp-select-buy-btn :buyname="editDto.buyname" :disabled="!state.edit" @select="onSelectBuy"
                            @unSelect="onUnSelectBuy"></erp-select-buy-btn>
      </erp-form-item>
      <erp-form-item v-if="inputVisible.buy_b" label-for-name="转入供应商" lg-col="2" md-col="2">
        <erp-select-buy-btn :buyname="editDto.buyname_b" :disabled="!state.edit" @select="onSelectBuy_b"
                            @unSelect="onUnSelectBuy_b"></erp-select-buy-btn>
      </erp-form-item>
      <erp-form-item label-for-name="备注" lg-col="2" md-col="4">
        <erp-input-round v-model="editDto.reMark1" :disabled="!state.edit"></erp-input-round>
      </erp-form-item>
    </erp-form>

    <erp-title title="核销明细">
      <erp-button v-show="state.edit && editDto.sheetType !== 3" @click="clickedAddSheetMxBtn">增加明细</erp-button>
      <erp-button v-show="state.edit && editDto.sheetType === 3" @click="clickedAddAccountsReceivableToSheetMxBtn">选应收
      </erp-button>
      <erp-button v-show="state.edit && editDto.sheetType === 3" @click="clickedAddAccountsPayableToSheetMxBtn">选应付
      </erp-button>
      <erp-button v-show="state.edit" type="danger" @click="deleteSheetMxToSelected">删除明细</erp-button>
    </erp-title>

    <erp-table ref="accountsVerifySheetMxEditRef" :find-dto="{}" :getRowNodeId="getRowNodeId" :table-edit="state.edit"
               :table-state="editAccountsVerifySheetMxTableConfig" @selection-changed="()=>{}">
    </erp-table>
  </erp-page-box>
</template>

<script lang="ts">
import ErpForm from "@/components/form/ErpForm.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpPageBox from "@/components/page/ErpPageBox.vue";
import ErpNoTitle from "@/components/title/ErpNoTitle.vue";
import ErpButton from "@/components/button/ErpButton.vue";
import ErpDelimiter from "@/components/delimiter/ErpDelimiter.vue";
import ErpFormItem from "@/components/form/ErpFormItem.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpSelectBuyBtn from "@/components/button/ErpSelectBuyBtn.vue";
import ErpSelectClientBtn from "@/components/button/ErpSelectClientBtn.vue";
import ErpAccountsVerifySheetTypeSelect from "@/components/select/ErpAccountsVerifySheetTypeSelect.vue";
import {
  editAccountsVerifySheetMxTableConfig
} from "@/view/accountsVerifySheet/tableConfig/editAccountsVerifySheetMxTableConfig";
import {IBuy} from "@/module/buy/buy";
import {IClient} from "@/module/client/client";
import {useRoute, useRouter} from "vue-router";
import {defineComponent, onMounted, ref} from "vue";
import {AccountsVerifySheetCreateDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetCreate.dto";
import {AccountsVerifySheetType} from "@/module/accountsVerifySheet/accountsVerifySheet";
import {ErpSelectAccountPayableDialog} from "@/components/dialog/selectInfo/accountPayable";
import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";
import {AccountCategoryType} from "@/types/AccountCategoryType";
import {ErpSelectAccountReceivableDialog} from "@/components/dialog/selectInfo/accountReceivable";
import {IAccountsReceivableFind} from "@/module/accountReceivable/accountReceivable";
import {AccountsVerifySheetMxCreateDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetMxCreate.dto";
import {IAccountsVerifySheetMx} from "@/module/accountsVerifySheet/accountsVerifySheetMx";
import {ITableRef} from "@/components/table/type";
import {AccountsVerifySheetService} from "@/module/accountsVerifySheet/accountsVerifySheet.service";
import {AccountsVerifySheetMxService} from "@/module/accountsVerifySheet/accountsVerifySheetMx.service";
import {AccountsVerifySheetUpdateDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetUpdate.dto";
import {getToday, useRouterPage} from "@/utils";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {getButtonState, IButtonState} from "@/composables/useSheetButtonState";

import ErpDialog from "@/components/dialog/dialog";
import {tabMenu} from "@/components/router_tab/useRouterTab";

export default defineComponent({
  name: "accountsVerifySheetEditView",
  components: {
    ErpForm,
    ErpTable,
    ErpTitle,
    ErpPageBox,
    ErpNoTitle,
    ErpButton,
    ErpFormItem,
    ErpInputRound,
    ErpSelectBuyBtn,
    ErpSelectClientBtn,
    ErpDelimiter,
    ErpAccountsVerifySheetTypeSelect,
  },
  setup() {
    onMounted(() => {
      initPage();
    })

    const route = useRoute();
    const router = useRouter();
    const accountsVerifySheetMxEditRef = ref<ITableRef>();
    const editDto = ref(new AccountsVerifySheetCreateDto({
      accountsVerifySheetCode: "",
      accountsVerifySheetId: 0,
      buyid: 0,
      buyid_b: 0,
      clientid: 0,
      clientid_b: 0,
      createdAt: null,
      creater: "",
      del_uuid: 0,
      deleteAt: null,
      deleter: "",
      inDate: getToday(),
      level1Date: null,
      level1Name: "",
      level1Review: 0,
      level2Date: null,
      level2Name: "",
      level2Review: 0,
      sheetType: 1,
      updatedAt: null,
      updater: "",
      reMark1: '',
      reMark2: '',
      reMark3: ''
    }))

    const buttonShowState = ref<IButtonState>({
      create: true,
      edit: false,
      level1review: true,
      un_level1review: false,
      level2review: false,
      un_level2review: false,
      delete_data: false
    });

    const inputVisible = ref({
      client: true,
      client_b: false,
      buy: false,
      buy_b: false
    })

    const state = ref({
      accountsVerifySheetId: Number(route.query.accountsVerifySheetId || 0),
      edit: true,
    })

    function getRowNodeId(data: IAccountsVerifySheetMx) {
      return data.printId
    }

    async function clickedSaveButton() {
      accountsVerifySheetMxEditRef.value?.getGridApi().stopEditing();
      if (state.value.accountsVerifySheetId === 0) {
        editDto.value.accountsVerifySheetMx = getTableSheetMx();
        const createResult = await accountsVerifySheetService.create(editDto.value);
        if (createResult && createResult.id) {
          state.value.accountsVerifySheetId = createResult.id;

          tabMenu.closeTab(route.fullPath)
          const newRoute = router.resolve({
            name: "accountsVerifySheetEdit", query: {
              accountsVerifySheetId: editDto.value.accountsVerifySheetId
            }
          });
          useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
        }
      } else {
        editDto.value.accountsVerifySheetMx = getTableSheetMx();
        await accountsVerifySheetService.update(editDto.value);
      }
    }

    async function clickedDeleteButton() {
      const {accountsVerifySheetCode, accountsVerifySheetId} = await editDto.value;
      ErpDialog({
        title: "提示",
        message: `是否删除 ${accountsVerifySheetCode} 核销单`,
        ok: async () => {
          await accountsVerifySheetService.delete_data({accountsVerifySheetId});

          //跳转
          tabMenu.closeTab(route.fullPath)
          const newRoute = router.resolve({
            name: "accountsVerifySheetFind"
          });
          useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
        }
      })
    }

    async function clickedL1ReviewButton() {
      accountsVerifySheetMxEditRef.value?.getGridApi().stopEditing();
      if (state.value.accountsVerifySheetId !== 0) {
        const {accountsVerifySheetCode} = await editDto.value;
        ErpDialog({
          title: "提示",
          message: `是否审核 ${accountsVerifySheetCode} 核销单`,
          ok: async () => {
            editDto.value.accountsVerifySheetMx = getTableSheetMx();
            await accountsVerifySheetService.update_l1Review(editDto.value);
            await initSheetMxTableData();
            await initPage();
          }
        })
      } else {
        ErpDialog({
          title: "提示",
          message: `是否保存并审核`,
          ok: async () => {
            editDto.value.accountsVerifySheetMx = getTableSheetMx();
            const createResult = await accountsVerifySheetService.create_l1Review(editDto.value);
            state.value.accountsVerifySheetId = createResult.id

            if (createResult && createResult.id) {
              state.value.accountsVerifySheetId = createResult.id;

              tabMenu.closeTab(route.fullPath)
              const newRoute = router.resolve({
                name: "accountsVerifySheetEdit", query: {
                  accountsVerifySheetId: editDto.value.accountsVerifySheetId
                }
              });
              useRouterPage(newRoute.fullPath, newRoute.meta.title as string);
            }
          }
        })
      }
    }

    async function clickedUnL1ReviewButton() {
      const {accountsVerifySheetCode, accountsVerifySheetId} = await editDto.value;
      ErpDialog({
        title: "提示",
        message: `是否撤审 ${accountsVerifySheetCode} 核销单`,
        ok: async () => {
          await accountsVerifySheetService.unL1Review({accountsVerifySheetId});
          await initSheetMxTableData();
          await initPage();
        }
      })
    }

    function refreshFromSheetType(sheetType: number) {
      switch (sheetType) {
        case AccountsVerifySheetType.advancePayment_accountsReceivable_1:
          inputVisible.value.client = true;
          inputVisible.value.client_b = false;
          inputVisible.value.buy = false;
          inputVisible.value.buy_b = false;
          break;
        case AccountsVerifySheetType.prepayments_accountsPayable_2:
          inputVisible.value.client = false;
          inputVisible.value.client_b = false;
          inputVisible.value.buy = true;
          inputVisible.value.buy_b = false;
          break;
        case AccountsVerifySheetType.accountsReceivable_accountsPayable_3:
          inputVisible.value.client = true;
          inputVisible.value.client_b = false;
          inputVisible.value.buy = true;
          inputVisible.value.buy_b = false;
          break;
        case AccountsVerifySheetType.accountsReceivable_accountsReceivable_4:
          inputVisible.value.client = true;
          inputVisible.value.client_b = true;
          inputVisible.value.buy = false;
          inputVisible.value.buy_b = false;
          break;
        case AccountsVerifySheetType.accountsPayable_accountsPayable_5:
          inputVisible.value.client = false;
          inputVisible.value.client_b = false;
          inputVisible.value.buy = true;
          inputVisible.value.buy_b = true;
          break;
        default:
          break;
      }
      clearEditDto();
      initSheetMxTableData();
    }

    function clearEditDto() {
      editDto.value.clientid = 0;
      editDto.value.clientname = '';
      editDto.value.clientid_b = 0;
      editDto.value.clientname_b = '';
      editDto.value.buyid = 0;
      editDto.value.buyname = '';
      editDto.value.buyid_b = 0;
      editDto.value.buyname_b = '';
    }

    function onSelectClient(client: IClient) {
      if (editDto.value.clientid_b !== client.clientid) {
        editDto.value.clientid = client.clientid;
        editDto.value.clientname = client.clientname;
      } else {
        return Promise.reject(new VerifyParamError('转出客户不能与转入客户相同'))
      }
    }

    function onSelectClient_b(client: IClient) {
      if (editDto.value.clientid !== client.clientid) {
        editDto.value.clientid_b = client.clientid;
        editDto.value.clientname_b = client.clientname;
      } else {
        return Promise.reject(new VerifyParamError('转出客户不能与转入客户相同'))
      }
    }

    function onUnSelectClient() {
      editDto.value.clientid = 0;
      editDto.value.clientname = '';
      initSheetMxTableData();
    }

    function onUnSelectClient_b() {
      editDto.value.clientid_b = 0;
      editDto.value.clientname_b = '';
      initSheetMxTableData();
    }

    function onSelectBuy(buy: IBuy) {
      if (editDto.value.buyid_b !== buy.buyid) {
        editDto.value.buyid = buy.buyid;
        editDto.value.buyname = buy.buyname;
      } else {
        return Promise.reject(new VerifyParamError('转出供应商不能与转入供应商相同'))
      }
    }

    function onSelectBuy_b(buy: IBuy) {
      if (editDto.value.buyid !== buy.buyid) {
        editDto.value.buyid_b = buy.buyid;
        editDto.value.buyname_b = buy.buyname;
      } else {
        return Promise.reject(new VerifyParamError('转出供应商不能与转入供应商相同'))
      }
    }

    function onUnSelectBuy() {
      editDto.value.buyid = 0;
      editDto.value.buyname = '';
      initSheetMxTableData();
    }

    function onUnSelectBuy_b() {
      editDto.value.buyid_b = 0;
      editDto.value.buyname_b = '';
      initSheetMxTableData();
    }

    function clickedAddSheetMxBtn() {
      switch (editDto.value.sheetType) {
        case AccountsVerifySheetType.advancePayment_accountsReceivable_1:
          if (editDto.value.clientid === 0) {
            return Promise.reject(new VerifyParamError('请先选择客户'))
          }
          ErpSelectAccountReceivableDialog({
            clientid: editDto.value.clientid,
            ok: (accountsReceivableFinds: IAccountsReceivableFind[]) => {
              accountsReceivablesAddToSheetMx(accountsReceivableFinds);
            },
            accountsReceivableTypeList: [AccountCategoryType.accountsReceivable1, AccountCategoryType.advancePayment2, AccountCategoryType.otherReceivables3]
          })
          break;
        case AccountsVerifySheetType.prepayments_accountsPayable_2:
          if (editDto.value.buyid === 0) {
            return Promise.reject(new VerifyParamError('请先选择供应商'))
          }
          ErpSelectAccountPayableDialog({
                buyid: editDto.value.buyid,
                ok: (accountsPayableFinds: IAccountsPayableFind[]) => {
                  accountPayableAddToSheetMx(accountsPayableFinds);
                },
                accountsPayableTypeList: [AccountCategoryType.accountsPayable4, AccountCategoryType.prepayments5, AccountCategoryType.otherPayable6]
              }
          )
          break;
        case AccountsVerifySheetType.accountsReceivable_accountsReceivable_4:
          if (editDto.value.clientid === 0) {
            return Promise.reject(new VerifyParamError('请先选择客户'))
          }

          if (editDto.value.clientid_b === 0) {
            return Promise.reject(new VerifyParamError('请先选择转入客户'))
          }
          ErpSelectAccountReceivableDialog({
            clientid: editDto.value.clientid,
            ok: (accountsReceivableFinds: IAccountsReceivableFind[]) => {
              accountsReceivablesAddToSheetMx(accountsReceivableFinds);
            },
            accountsReceivableTypeList: [AccountCategoryType.accountsReceivable1, AccountCategoryType.otherReceivables3]
          })
          break;
        case AccountsVerifySheetType.accountsPayable_accountsPayable_5:
          if (editDto.value.buyid === 0) {
            return Promise.reject(new VerifyParamError('请先选择供应商'))
          }

          if (editDto.value.buyid_b === 0) {
            return Promise.reject(new VerifyParamError('请先选择转入供应商'))
          }
          ErpSelectAccountPayableDialog({
                buyid: editDto.value.buyid,
                ok: (accountsPayableFinds: IAccountsPayableFind[]) => {
                  accountPayableAddToSheetMx(accountsPayableFinds);
                },
                accountsPayableTypeList: [AccountCategoryType.accountsPayable4, AccountCategoryType.otherPayable6]
              }
          )
          break;
        default:
          break;
      }
    }

    function clickedAddAccountsReceivableToSheetMxBtn() {
      if (editDto.value.clientid === 0) {
        return Promise.reject(new VerifyParamError('请先选择客户'))
      }

      ErpSelectAccountReceivableDialog({
        clientid: editDto.value.clientid,
        ok: (accountsReceivableFinds: IAccountsReceivableFind[]) => {
          accountsReceivablesAddToSheetMx(accountsReceivableFinds);
        },
        accountsReceivableTypeList: [AccountCategoryType.accountsReceivable1, AccountCategoryType.otherReceivables3]
      })
    }

    function clickedAddAccountsPayableToSheetMxBtn() {
      if (editDto.value.buyid === 0) {
        return Promise.reject(new VerifyParamError('请先选择供应商'))
      }

      ErpSelectAccountPayableDialog({
            buyid: editDto.value.buyid,
            ok: (accountsPayableFinds: IAccountsPayableFind[]) => {
              accountPayableAddToSheetMx(accountsPayableFinds);
            },
            accountsPayableTypeList: [AccountCategoryType.accountsPayable4, AccountCategoryType.otherPayable6]
          }
      )
    }

    //应收账款添加到明细
    function accountsReceivablesAddToSheetMx(accountsReceivableFinds: IAccountsReceivableFind[]) {
      const accountsVerifySheetMxs: IAccountsVerifySheetMx[] = []
      for (let i = 0; i < accountsReceivableFinds.length; i++) {
        const accountsReceivable = accountsReceivableFinds[i];
        const accountsVerifySheetMxCreateDto = new AccountsVerifySheetMxCreateDto({
          accountsVerifySheetId: 0,
          accountsVerifySheetMxId: 0,
          amounts: accountsReceivable.amounts,
          amountsVerified: accountsReceivable.checkedAmounts,
          amountsNotVerify: accountsReceivable.notCheckAmounts,
          amountsThisVerify: 0,
          amountsMantissa: 0,
          correlationId: accountsReceivable.accountsReceivableId,
          correlationType: accountsReceivable.accountsReceivableType,
          printId: 0
        })
        accountsVerifySheetMxCreateDto.correlationCode = accountsReceivable.correlationCode;
        accountsVerifySheetMxs.push(accountsVerifySheetMxCreateDto);
      }
      addSheetMxToTable(accountsVerifySheetMxs);
    }

    //应收账款添加到明细
    function accountPayableAddToSheetMx(accountsPayableFinds: IAccountsPayableFind[]) {
      const accountsVerifySheetMxs: IAccountsVerifySheetMx[] = []
      for (let i = 0; i < accountsPayableFinds.length; i++) {
        const accountsPayableFind = accountsPayableFinds[i];
        const accountsVerifySheetMxCreateDto = new AccountsVerifySheetMxCreateDto({
          accountsVerifySheetId: 0,
          accountsVerifySheetMxId: 0,
          amounts: accountsPayableFind.amounts,
          amountsVerified: accountsPayableFind.checkedAmounts,
          amountsNotVerify: accountsPayableFind.notCheckAmounts,
          amountsThisVerify: 0,
          amountsMantissa: 0,
          correlationId: accountsPayableFind.accountsPayableId,
          correlationType: accountsPayableFind.accountsPayableType,
          printId: 0
        })
        accountsVerifySheetMxCreateDto.correlationCode = accountsPayableFind.correlationCode;
        accountsVerifySheetMxs.push(accountsVerifySheetMxCreateDto);
      }
      addSheetMxToTable(accountsVerifySheetMxs);
    }

    function getTableSheetMx() {
      const accountsVerifySheetMxs_existing: IAccountsVerifySheetMx[] = []
      accountsVerifySheetMxEditRef.value?.getGridApi().forEachNode((accountsVerifySheetMx) => {
        accountsVerifySheetMxs_existing.push(accountsVerifySheetMx.data);
      });

      return accountsVerifySheetMxs_existing
    }

    let NumberOfCalculationsToAddSheetMx: number = 0

    //是否存在
    function doesItExistSheetMx(accountsVerifySheetMx: IAccountsVerifySheetMx) {
      let doesItExist: boolean = false;
      const accountsVerifySheetMxs_existing = getTableSheetMx();
      for (let j = 0; j < accountsVerifySheetMxs_existing.length; j++) {
        if (accountsVerifySheetMxs_existing[j].correlationId === accountsVerifySheetMx.correlationId &&
            accountsVerifySheetMxs_existing[j].correlationType === accountsVerifySheetMx.correlationType
        ) {
          doesItExist = true
        }
      }
      return doesItExist
    }

    //添加明细到表格
    function addSheetMxToTable(accountsVerifySheetMxs: IAccountsVerifySheetMx[]) {
      for (let i = 0; i < accountsVerifySheetMxs.length; i++) {
        if (!doesItExistSheetMx(accountsVerifySheetMxs[i])) {
          NumberOfCalculationsToAddSheetMx = NumberOfCalculationsToAddSheetMx + 1
          accountsVerifySheetMxs[i].printId = NumberOfCalculationsToAddSheetMx;
          accountsVerifySheetMxEditRef.value?.getGridApi().applyTransaction({add: [accountsVerifySheetMxs[i]]});
        }
      }
    }

    //清空SheetMxTableData
    async function initSheetMxTableData() {
      await accountsVerifySheetMxEditRef.value?.initTableDataList();
    }

    //删除选中
    async function deleteSheetMxToSelected() {
      const accountsVerifySheetMxs = await accountsVerifySheetMxEditRef.value?.getGridApi().getSelectedRows();
      await accountsVerifySheetMxEditRef.value?.getGridApi().applyTransaction({remove: accountsVerifySheetMxs});
    }

    const accountsVerifySheetService = new AccountsVerifySheetService();
    const accountsVerifySheetMxService = new AccountsVerifySheetMxService();

    async function initPage() {

      if (state.value.accountsVerifySheetId !== 0) {
        //获取单头
        const accountsVerifySheetHead = await accountsVerifySheetService.findOne(state.value.accountsVerifySheetId)
        refreshFromSheetType(accountsVerifySheetHead.sheetType);
        editDto.value = new AccountsVerifySheetUpdateDto(accountsVerifySheetHead);
        editDto.value.clientname = accountsVerifySheetHead.clientname;
        editDto.value.clientname_b = accountsVerifySheetHead.clientname_b;
        editDto.value.buyname = accountsVerifySheetHead.buyname;
        editDto.value.buyname_b = accountsVerifySheetHead.buyname_b;

        //控制可编辑状态
        state.value.edit = accountsVerifySheetHead.level1Review + accountsVerifySheetHead.level2Review === 0;

        //更新按钮状态
        buttonShowState.value = getButtonState(accountsVerifySheetHead.level1Review, accountsVerifySheetHead.level2Review);

        //获取明细
        const accountsVerifySheetMxList = await accountsVerifySheetMxService.find({accountsVerifySheetId: state.value.accountsVerifySheetId});
        await accountsVerifySheetMxEditRef.value?.getGridApi().applyTransaction({add: accountsVerifySheetMxList});
      } else {
        state.value.edit = true
      }
    }

    return {
      state,
      tabMenu,
      editDto,
      inputVisible,
      buttonShowState,
      accountsVerifySheetMxEditRef,
      editAccountsVerifySheetMxTableConfig,
      getRowNodeId,
      clickedSaveButton,
      clickedDeleteButton,
      clickedL1ReviewButton,
      clickedUnL1ReviewButton,
      refreshFromSheetType,
      onSelectClient,
      onSelectClient_b,
      onUnSelectClient,
      onUnSelectClient_b,
      onSelectBuy,
      onSelectBuy_b,
      onUnSelectBuy,
      onUnSelectBuy_b,
      clickedAddSheetMxBtn,
      clickedAddAccountsReceivableToSheetMxBtn,
      clickedAddAccountsPayableToSheetMxBtn,
      deleteSheetMxToSelected,
    };
  },
});
</script>
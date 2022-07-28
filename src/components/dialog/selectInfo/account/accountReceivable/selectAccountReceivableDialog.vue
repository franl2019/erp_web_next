<template>
  <erp_full-screen-dialog :left-menu="false">
    <!--    <template v-slot:left>-->
    <!--      <erp_title title=""></erp_title>-->
    <!--    </template>-->
    <template v-slot:default>
      <erp_title title="选择客户核销明细">
        <template v-slot:input>
          <erp_input_rounded class="md:w-52" v-model="accountsReceivableFindDto.correlationCode" @change="onSearchChange"
                             placeholder="输入关键词"></erp_input_rounded>
        </template>
        <erp_button @click="clickedOkSelectedDialog" type="success">确定选择</erp_button>
        <erp_button @click="clickedCloseSelectedDialog">关闭选择</erp_button>
      </erp_title>
      <erp_table ref="selectSheetMxTableRef"
                 :table-state="selectAccountInComeSheetMxTableConfig"
                 :find-dto="accountsReceivableFindDto"
                 @rowDoubleClicked="sheetMxTableRefDoubleClick"
                 :getRowNodeId="getRowNodeId"
      ></erp_table>
      <erp_title title="已选择明细">
        <erp_button @click="clickedDeleteSelected" type="danger">删除已选</erp_button>
        <erp_button @click="clickedClearSelected">清空已选</erp_button>
      </erp_title>
      <erp_table ref="selectedTableRef"
                 :table-state="selectedAccountInComeSheetMxTableConfig"
                 :find-dto="{}"
                 :getRowNodeId="getRowNodeId"
      ></erp_table>
    </template>
  </erp_full-screen-dialog>
</template>

<script setup lang='ts'>
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import Erp_fullScreenDialog from "@/components/dialog/ErpLeftRightStructureDialog.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {
  selectAccountInComeSheetMxTableConfig
} from "@/view/accountInCome/config/selectAccountInComeSheetMxTableConfig";
import {
  selectedAccountInComeSheetMxTableConfig
} from "@/view/accountInCome/config/selectedAccountInComeSheetMxTableConfig";
import {AccountsReceivableFindDto} from "@/module/accountReceivable/dto/accountReceivableFind.dto";
import {IAccountsReceivableFind} from "@/module/accountReceivable/accountReceivable";

const selectSheetMxTableRef = ref<ITableRef>()
const accountsReceivableFindDto = ref<AccountsReceivableFindDto>(new AccountsReceivableFindDto({
  accountsReceivableId: 0,
  accountsReceivableTypeList: [],
  amounts: 0,
  checkedAmounts: 0,
  clientid: 0,
  correlationCode: "",
  correlationId: 0,
  correlationType: 0,
  endDate: "",
  notCheckAmounts: 0,
  page: 0,
  pagesize: 0,
  startDate: ""
}));

const props = withDefaults(defineProps<{
  unmount?: Function
  ok?: Function
  close?: Function
  clientid?: number
  accountsReceivableTypeList:number[]
}>(), {
  unmount: () => {
  },
  ok: () => {
  },
  close: () => {
  },
  clientid: 0,
  accountsReceivableTypeList:()=>[]
})

//表格行id设置
function getRowNodeId(data: IAccountsReceivableFind) {
  return data.accountsReceivableId
}

onMounted(async () => {
  accountsReceivableFindDto.value.accountsReceivableTypeList = [...props.accountsReceivableTypeList]
  accountsReceivableFindDto.value.clientid = props.clientid;
  await selectSheetMxTableRef.value?.initTableData();
  document.onkeydown = (event) => {
    if (event.key === 'Escape') {
      props.unmount();
    }
  }
})


//搜索栏
async function onSearchChange() {
  await selectSheetMxTableRef.value?.initTableData();
}

//产品资料表行双击
function sheetMxTableRefDoubleClick(event: RowDoubleClickedEvent) {
  if (event.data && isAdded(event.data)) {
    addSelectedSheetMxInfo([event.data]);
  }
}

async function clickedOkSelectedDialog() {
  await props.ok(getSelectedAccountReceivableList());
  props.unmount();
}

async function clickedCloseSelectedDialog() {
  await props.close();
  props.unmount();
}

//已选表Ref
const selectedTableRef = ref<ITableRef>()

//增加已选
function addSelectedSheetMxInfo(accountsReceivableList: IAccountsReceivableFind[]) {
  selectedTableRef.value?.getGridApi().applyTransaction({add: accountsReceivableList});
}

//删除已选
function deleteSelectedSheetMxInfo(accountsReceivableList: IAccountsReceivableFind[]) {
  selectedTableRef.value?.getGridApi().applyTransaction({remove: accountsReceivableList});
}

//获取已选
function getSelectedAccountReceivableList(): IAccountsReceivableFind[] {
  const accountsReceivableList: IAccountsReceivableFind[] = [];
  selectedTableRef.value?.getGridApi().forEachNode(rowNode => {
    accountsReceivableList.push(rowNode.data);
  })
  return accountsReceivableList
}

//删除已选按钮事件
function clickedDeleteSelected() {
  const accountReceivableList = selectedTableRef.value?.getGridApi().getSelectedRows();
  if (accountReceivableList) {
    deleteSelectedSheetMxInfo(accountReceivableList);
  }
}

//清空已选按钮事件
function clickedClearSelected() {
  selectedTableRef.value?.getGridApi().setRowData([]);
}

//是已添加？
function isAdded(accountsReceivable: IAccountsReceivableFind): boolean {
  const accountsReceivableList: IAccountsReceivableFind[] = getSelectedAccountReceivableList();

  for (let i = 0; i < accountsReceivableList.length; i++) {
    if (accountsReceivableList[i].accountsReceivableId === accountsReceivable.accountsReceivableId) {
      return false
    }
  }

  return true
}
</script>
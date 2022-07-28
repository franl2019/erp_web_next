<template>
  <erp-full-screen-dialog :left-menu="false">
    <template v-slot:default>
      <erp-title title="选择供应商核销明细">
        <template v-slot:input>
          <erp-input-round class="md:w-52" v-model="accountsPayableFindDto.correlationCode" @change="onSearchChange"
                             placeholder="输入关键词"></erp-input-round>
        </template>
        <erp-button @click="clickedOkSelectedDialog" type="success">确定选择</erp-button>
        <erp-button @click="clickedCloseSelectedDialog">关闭选择</erp-button>
      </erp-title>
      <erp-table ref="selectSheetMxTableRef"
                 :table-state="selectAccountExpenditureSheetMxTableConfig"
                 :find-dto="accountsPayableFindDto"
                 @rowDoubleClicked="sheetMxTableRefDoubleClick"
                 :getRowNodeId="getRowNodeId"
      ></erp-table>
      <erp-title title="已选择明细">
        <erp-button @click="clickedDeleteSelected" type="danger">删除已选</erp-button>
        <erp-button @click="clickedClearSelected">清空已选</erp-button>
      </erp-title>
      <erp-table ref="selectedTableRef"
                 :table-state="selectedAccountExpenditureSheetMxTableConfig"
                 :find-dto="{}"
                 :getRowNodeId="getRowNodeId"
      ></erp-table>
    </template>
  </erp-full-screen-dialog>
</template>

<script setup lang='ts'>
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import {onMounted, ref} from "vue";
import {ITableRef} from "@/components/table/type";
import ErpTable from "@/components/table/ErpTable.vue";
import {RowDoubleClickedEvent} from "ag-grid-community";
import ErpFullScreenDialog from "@/components/dialog/ErpLeftRightStructureDialog.vue";
import {AccountsPayableFindDto} from "@/module/accountsPayable/dto/accountsPayableFind.dto";
import {
  selectAccountExpenditureSheetMxTableConfig
} from "@/view/accountExpenditure/config/selectAccountExpenditureSheetMxTableConfig";
import {
  selectedAccountExpenditureSheetMxTableConfig
} from "@/view/accountExpenditure/config/selectedAccountExpenditureSheetMxTableConfig";
import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";

const selectSheetMxTableRef = ref<ITableRef>()
const accountsPayableFindDto = ref<AccountsPayableFindDto>(new AccountsPayableFindDto());

const props = withDefaults(defineProps<{
  unmount?: Function
  ok?: Function
  close?: Function
  buyid: number
  accountsPayableTypeList:number[]
}>(), {
  unmount: () => {
  },
  ok: () => {
  },
  close: () => {
  },
  buyid:0,
  accountsPayableTypeList:()=>[]
})

//表格行id设置
function getRowNodeId(data: IAccountsPayableFind) {
  return data.accountsPayableId
}

onMounted(async () => {
  accountsPayableFindDto.value.accountsPayableTypeList = [...props.accountsPayableTypeList]
  accountsPayableFindDto.value.buyid = props.buyid;
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
  await props.ok(getSelectedAccountPayableList());
  props.unmount();
}

async function clickedCloseSelectedDialog() {
  await props.close();
  props.unmount();
}

//已选表Ref
const selectedTableRef = ref<ITableRef>()

//增加已选
function addSelectedSheetMxInfo(accountsPayableList: IAccountsPayableFind[]) {
  selectedTableRef.value?.getGridApi().applyTransaction({add: accountsPayableList});
}

//删除已选
function deleteSelectedSheetMxInfo(accountsPayableList: IAccountsPayableFind[]) {
  selectedTableRef.value?.getGridApi().applyTransaction({remove: accountsPayableList});
}

//获取已选
function getSelectedAccountPayableList(): IAccountsPayableFind[] {
  const accountsPayableList: IAccountsPayableFind[] = [];
  selectedTableRef.value?.getGridApi().forEachNode(rowNode => {
    accountsPayableList.push(rowNode.data);
  })
  return accountsPayableList
}

//删除已选按钮事件
function clickedDeleteSelected() {
  const accountPayableList = selectedTableRef.value?.getGridApi().getSelectedRows();
  if (accountPayableList) {
    deleteSelectedSheetMxInfo(accountPayableList);
  }
}

//清空已选按钮事件
function clickedClearSelected() {
  selectedTableRef.value?.getGridApi().setRowData([]);
}

//是已添加？
function isAdded(accountsPayable: IAccountsPayableFind): boolean {
  const accountsPayableList: IAccountsPayableFind[] = getSelectedAccountPayableList();

  for (let i = 0; i < accountsPayableList.length; i++) {
    if (accountsPayableList[i].accountsPayableId === accountsPayable.accountsPayableId) {
      return false
    }
  }

  return true
}
</script>
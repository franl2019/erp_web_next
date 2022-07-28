<template>
  <erp_full-screen-dialog :left-menu="false">
    <erp_title title="供应商付款账单选择">
      <template v-slot:input>
        <erp_input_rounded class="md:w-52" v-model="accountsPayableFindDto.correlationCode" placeholder="输入单据编号搜索" @change="onChangeInput"></erp_input_rounded>
      </template>
      <erp_button @click="clickedUnSelect">取消选择</erp_button>
      <erp_button @click="clickedSelect" type="success">选择</erp_button>
    </erp_title>
    <erp_table
        ref="accountsPayableTableRef"
        :getRowNodeId="getRowNodeId"
        :tableState="accountsPayableTableConfig"
        :find-dto="accountsPayableFindDto"
        @rowDoubleClicked="onDoubleClickedRow"
    >
    </erp_table>
  </erp_full-screen-dialog>
</template>

<script setup lang="ts">
import Erp_title from "@/components/title/ErpTitle.vue";
import Erp_input_rounded from "@/components/input/ErpInputRound.vue";
import Erp_button from "@/components/button/ErpButton.vue";
import Erp_fullScreenDialog from "@/components/dialog/ErpLeftRightStructureDialog.vue";
import Erp_table from "@/components/table/ErpTable.vue";
import {accountsPayableTableConfig} from "@/view/accountsPayable/tableConfig/accountsPayableTableConfig";
import {onMounted, ref} from "vue";
import {AccountsPayableFindDto} from "@/module/accountsPayable/dto/accountsPayableFind.dto";
import {ITableRef} from "@/components/table/type";
import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";
import {RowDoubleClickedEvent} from "ag-grid-community";

export interface IAccountsPayableDialog {
  unmount?: Function;
  ok?: (accountPayableList: IAccountsPayableFind[]) => Promise<void>;
  close?: () => Promise<void>;
  buyid: number;
}

const props = withDefaults(defineProps<IAccountsPayableDialog>(), {
  unmount: () => {
  },
  ok:async () => {},
  close:async () => {
  },
  buyid: 0,
})

onMounted(async () => {
  await accountsPayableTableRef.value?.initTableData();
})

const accountsPayableTableRef = ref<ITableRef>();
const accountsPayableFindDto = ref(new AccountsPayableFindDto());
accountsPayableFindDto.value.buyid = props.buyid;

function getRowNodeId(accountsPayable: IAccountsPayableFind) {
  return accountsPayable.accountsPayableId
}

async function clickedUnSelect() {
  await props.close();
  await props.unmount();
}

async function clickedSelect() {
  await props.ok(getTableSelect());
  await props.unmount();
}

function getTableSelect(): IAccountsPayableFind[] {
  const accountsPayableSelectList: IAccountsPayableFind[] = [];
  accountsPayableTableRef.value?.getGridApi().forEachNode(rowNode => accountsPayableSelectList.push(rowNode.data));
  return accountsPayableSelectList;
}

async function onDoubleClickedRow(event: RowDoubleClickedEvent) {
  await props.ok([event.data]);
  await props.unmount();
}

async function onChangeInput() {
  await accountsPayableTableRef.value?.initTableData();
}
</script>

<style scoped>
</style>
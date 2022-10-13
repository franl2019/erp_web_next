<template>
  <erp-left-right-structure-dialog :left-menu="false">
    <template #default>
      <erp-title title="选择客户核销明细">
        <template #input>
          <erp-input-round v-model="accountsReceivableFindDto.correlationCode" class="md:w-52"
                             placeholder="输入关键词" @change="onSearchChange"></erp-input-round>
        </template>
        <erp-button type="success" @click="clickedOkSelectedDialog">确定选择</erp-button>
        <erp-button @click="clickedCloseSelectedDialog">关闭选择</erp-button>
      </erp-title>
      <erp-table ref="selectSheetMxTableRef"
                 :find-dto="accountsReceivableFindDto"
                 :getRowNodeId="getRowNodeId"
                 :table-state="selectAccountInComeSheetMxTableConfig"
                 @rowDoubleClicked="sheetMxTableRefDoubleClick"></erp-table>
      <erp-title title="已选择明细">
        <erp-button type="danger" @click="clickedDeleteSelected">删除已选</erp-button>
        <erp-button @click="clickedClearSelected">清空已选</erp-button>
      </erp-title>
      <erp-table ref="selectedTableRef"
                 :find-dto="{}"
                 :getRowNodeId="getRowNodeId"
                 :table-state="selectedAccountInComeSheetMxTableConfig">

      </erp-table>
    </template>
  </erp-left-right-structure-dialog>
</template>

<script lang='ts'>
import ErpButton from "@/components/button/ErpButton.vue";
import ErpTitle from "@/components/title/ErpTitle.vue";
import ErpInputRound from "@/components/input/ErpInputRound.vue";
import ErpTable from "@/components/table/ErpTable.vue";
import ErpLeftRightStructureDialog from "@/components/dialog/ErpLeftRightLayoutDialog.vue";
import {defineComponent, onMounted, PropType, ref, unref} from "vue";
import {ITableRef} from "@/components/table/type";
import {RowDoubleClickedEvent} from "ag-grid-community";
import {selectAccountInComeSheetMxTableConfig} from "@/view/accountInCome/config/selectAccountInComeSheetMxTableConfig";
import {
  selectedAccountInComeSheetMxTableConfig
} from "@/view/accountInCome/config/selectedAccountInComeSheetMxTableConfig";
import {AccountsReceivableFindDto} from "@/module/accountReceivable/dto/accountReceivableFind.dto";
import {IAccountsReceivableFind} from "@/module/accountReceivable/accountReceivable";

export default defineComponent({
  name:"ErpSelectAccountReceivableDialog",
  props: {
    unmount: {
      type: Function,
      default: () => {
      },
    },
    ok: {
      type: Function,
      default: () => {
      },
    },
    close: {
      type: Function,
      default: () => {
      },
    },
    clientid: {
      type: Number,
      default: 0,
    },
    accountsReceivableTypeList: {
      type: Array as PropType<number[]>,
      required: true,
      default: () => [],
    },
  },
  components:{
    ErpButton,
    ErpTitle,
    ErpInputRound,
    ErpTable,
    ErpLeftRightStructureDialog
  },
  setup(props) {
    const selectSheetMxTableRef = ref<ITableRef>()
    const { accountsReceivableTypeList ,clientid} = unref(props);
    const accountsReceivableFindDto = ref<AccountsReceivableFindDto>(new AccountsReceivableFindDto({
      accountsReceivableId: 0,
      accountsReceivableTypeList: accountsReceivableTypeList,
      amounts: 0,
      checkedAmounts: 0,
      clientid: clientid,
      correlationCode: "",
      correlationId: 0,
      correlationType: 0,
      endDate: "",
      notCheckAmounts: 0,
      page: 0,
      pagesize: 0,
      startDate: ""
    }));

    //表格行id设置
    function getRowNodeId(data: IAccountsReceivableFind) {
      return data.accountsReceivableId
    }

    onMounted(async () => {
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

    return {
      selectAccountInComeSheetMxTableConfig,
      selectedAccountInComeSheetMxTableConfig,
      selectSheetMxTableRef,
      selectedTableRef,
      accountsReceivableFindDto,
      props,
      getRowNodeId,
      onSearchChange,
      sheetMxTableRefDoubleClick,
      clickedOkSelectedDialog,
      clickedCloseSelectedDialog,
      clickedDeleteSelected,
      clickedClearSelected,
    };
  },
});
</script>
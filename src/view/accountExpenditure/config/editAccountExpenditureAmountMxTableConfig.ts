import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {AccountExpenditureAmountMxService} from "@/module/accountExpenditure/accountExpenditureAmountMx.service";
import Table_Account from '@/components/table/components/renderer/table_renderer_account.vue'
import Table_select_account from '@/components/table/components/select/table_select_account_auth.vue'
import {onlyNumberValueSetter} from "@/components/table/valueSetter/onlyNumberValueSetter";

export const editAccountExpenditureAmountMxTableConfig = ref<ITableState<IAccountExpenditureAmountMx>>({
    tableName: "editAccountExpenditureAmountMxTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true,
        // stopEditingWhenCellsLoseFocus: true//编辑焦点丢失，自动确认修改，有弹出单元格组件不能使用
    },
    columnDefaults: [
        {
            rowDrag: true,
            editable: false
        },
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
            editable: false
        },
        {
            headerName: '付款账号',
            field: 'accountId',
            cellRendererFramework: Table_Account,
            cellEditorFramework: Table_select_account,
            singleClickEdit: true,
            editable: true
        },
        {
            headerName: '金额',
            field: 'amount',
            valueSetter: (params) => onlyNumberValueSetter(params),
            editable: true
        },
        {headerName: '备注1', field: 'reMark1',editable: true},
        {headerName: '备注2', field: 'reMark2',editable: true},
        {headerName: '备注3', field: 'reMark3',editable: true},
        {headerName: '收款人', field: 'payee',editable: true},
        {headerName: '收款账户', field: 'receivingAccount',editable: true},
    ],
    tableService: new AccountExpenditureAmountMxService(),
})
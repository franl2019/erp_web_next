import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {AccountExpenditureAmountMxService} from "@/module/accountExpenditure/accountExpenditureAmountMx.service";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";


export const defaultAccountExpenditureAmountMxTableConfig = ref<ITableState<IAccountExpenditureAmountMx>>({
    tableName: "defaultAccountExpenditureAmountMxTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
            editable: false
        },
        {headerName: '付款账号', field: 'accountName'},
        {headerName: '金额', field: 'amount', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '备注1', field: 'reMark1'},
        {headerName: '备注2', field: 'reMark2'},
        {headerName: '备注3', field: 'reMark3'},
        {headerName: '收款人', field: 'payee'},
        {headerName: '收款账户', field: 'receivingAccount'},
    ],
    tableService: new AccountExpenditureAmountMxService(),
})
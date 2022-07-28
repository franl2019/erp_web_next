import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {AccountInComeAmountMxService} from "@/module/accountInCome/accountInComeAmountMx.service";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const defaultAccountInComeAmountMxTableConfig = ref<ITableState<IAccountInComeAmountMx>>({
    tableName: "defaultAccountInComeAmountMxTableConfig",
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
        },
        {headerName: '结算方式', field: 'settlementMethod'},
        {headerName: '出纳账户', field: 'accountName'},
        {headerName: '收款金额', field: 'amount', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '币种', field: 'currencyName'},
        {headerName: '汇率', field: 'exchangeRate'},
        {headerName: '应收金额', field: 'accountsReceivable', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '付款账户', field: 'paymentAccount'},
        {headerName: '备注', field: 'reMack1'},
        {headerName: '备注2', field: 'reMack2'},
        {headerName: '备注3', field: 'reMack3'},
    ],
    tableService: new AccountInComeAmountMxService(),
})
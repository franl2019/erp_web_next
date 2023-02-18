import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {IAccountsVerifySheetMx} from "@/module/accountsVerifySheet/accountsVerifySheetMx";
import {AccountsVerifySheetMxService} from "@/module/accountsVerifySheet/accountsVerifySheetMx.service";
import Table_account_Receivable_Payable_Type from "@/components/table/components/renderer/table_account_Receivable_Payable_Type.vue";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const accountsVerifySheetMxFindTableConfig = ref<ITableConfig<IAccountsVerifySheetMx>>({
    tableName: "accountsVerifySheetMxFindTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "multiple",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
        },
        {headerName: '相关单号', field: 'correlationCode'},
        {headerName: '账款类型', field: 'correlationType',cellRenderer: Table_account_Receivable_Payable_Type},
        {headerName: '单据金额', field: 'amounts'},
        {headerName: '已核销金额', field: 'amountsVerified', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '未核销金额', field: 'amountsNotVerify', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '冲尾数金额', field: 'amountsMantissa', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '本次核销金额', field: 'amountsThisVerify', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
    ],
    tableService: new AccountsVerifySheetMxService()
})
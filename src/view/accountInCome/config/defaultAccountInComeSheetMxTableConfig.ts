import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";
import {AccountInComeSheetMxService} from "@/module/accountInCome/accountInComeSheetMx.service";
import Table_accountReceivableType from "@/components/table/components/renderer/table_accountReceivableType.vue";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const defaultAccountInComeSheetMxTableConfig = ref<ITableState<IAccountInComeSheetMxFind>>({
    tableName: "defaultAccountInComeSheetMxTableConfig",
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
        {headerName: '相关单号', field: 'correlationCode'},
        {headerName: '账款类型', field: 'correlationType',cellRendererFramework: Table_accountReceivableType},
        {headerName: '单据金额', field: 'amounts', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
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
    tableService: new AccountInComeSheetMxService(),
})
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {AccountExpenditureSheetMxService} from "@/module/accountExpenditure/accountExpenditureSheetMx.service";
import Table_accountPayableType from "@/components/table/components/renderer/table_accountPayableType.vue";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";


export const defaultAccountExpenditureSheetMxTableConfig = ref<ITableState<IAccountExpenditureSheetMx>>({
    tableName: "defaultAccountExpenditureSheetMxTableConfig",
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
        {headerName: '相关单号', field: 'correlationCode'},
        {headerName: '单据类型', field: 'correlationType',cellRendererFramework:Table_accountPayableType},
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
    tableService: new AccountExpenditureSheetMxService(),
})


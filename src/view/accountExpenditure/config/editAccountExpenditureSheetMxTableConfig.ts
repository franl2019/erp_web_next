import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {AccountExpenditureSheetMxService} from "@/module/accountExpenditure/accountExpenditureSheetMx.service";
import Table_accountPayableType from "@/components/table/components/renderer/table_accountPayableType.vue";
import {
    formatEditAccountExpenditureSheetMx
} from "@/view/accountExpenditure/config/valueSetter/formatEditAccountExpenditureSheetMx";


export const editAccountExpenditureSheetMxTableConfig = ref<ITableConfig<IAccountExpenditureSheetMx>>({
    tableName: "editAccountExpenditureSheetMxTableConfig",
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
            rowDrag: true
        },
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
        },
        {headerName: '相关单号', field: 'correlationCode', editable: false},
        {
            headerName: '账款类型',
            field: 'correlationType',
            editable: false,
            cellRendererFramework: Table_accountPayableType
        },
        {headerName: '单据金额', field: 'amounts', editable: false},
        {headerName: '已核销金额', field: 'amountsVerified', editable: false},
        {headerName: '未核销金额', field: 'amountsNotVerify', editable: false},
        {
            headerName: '冲尾数金额',
            field: 'amountsMantissa',
            valueSetter: (params) => formatEditAccountExpenditureSheetMx(params),
            editable: true
        },
        {
            headerName: '本次核销金额',
            field: 'amountsThisVerify',
            valueSetter: (params) => formatEditAccountExpenditureSheetMx(params),
            editable: true
        },
    ],
    tableService: new AccountExpenditureSheetMxService(),
})
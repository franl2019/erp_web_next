import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";
import {AccountInComeSheetMxService} from "@/module/accountInCome/accountInComeSheetMx.service";
import {onlyNumberValueSetter} from "@/components/table/valueSetter/onlyNumberValueSetter";
import Table_accountReceivableType from "@/components/table/components/renderer/table_accountReceivableType.vue";

export const editAccountInComeSheetMxTableConfig = ref<ITableConfig<IAccountInComeSheetMxFind>>({
    tableName: "editAccountInComeSheetMxTableConfig",
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
            rowDrag: true,
            editable: false
        },
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
            editable: false
        },
        {headerName: '单据金额', field: 'amounts'},
        {headerName: '已核销金额', field: 'amountsVerified'},
        {headerName: '未核销金额', field: 'amountsNotVerify'},
        {
            headerName: '冲尾数金额', field: 'amountsMantissa', editable: true, valueSetter: (params) => {
                return onlyNumberValueSetter(params)
            }
        },
        {
            headerName: '本次核销金额', field: 'amountsThisVerify', editable: true, valueSetter: (params) => {
                return onlyNumberValueSetter(params)
            }
        },
        {headerName: '账款类型', field: 'correlationType',cellRendererFramework: Table_accountReceivableType,editable: true},
        {headerName: '相关单号', field: 'correlationCode',editable: true},
    ],
    tableService: new AccountInComeSheetMxService(),
})
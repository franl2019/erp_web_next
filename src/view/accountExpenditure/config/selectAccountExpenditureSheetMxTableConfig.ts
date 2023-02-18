import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {AccountsPayableService} from "@/module/accountsPayable/accountsPayable.service";
import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_accountPayableType from "@/components/table/components/renderer/table_accountPayableType.vue";
import Table_CodeType from "@/components/table/components/renderer/table_CodeType.vue";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const selectAccountExpenditureSheetMxTableConfig = ref<ITableConfig<IAccountsPayableFind>>({
    tableName: "selectAccountExpenditureSheetMxTableConfig",
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
        {headerName: '供应商', field: 'buyname'},
        {headerName: '相关单号', field: 'correlationCode'},
        {headerName: '单据类型', field: 'correlationType', cellRenderer: Table_CodeType},
        {headerName: '应付账款类型', field: 'accountsPayableType', cellRenderer: Table_accountPayableType},
        {
            headerName: '单据金额', field: 'amounts', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '已核销金额', field: 'checkedAmounts', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '未核销金额', field: 'notCheckAmounts', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建日期', field: 'createdAt', cellRenderer: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改日期', field: 'updatedAt', cellRenderer: Table_Date},
    ],
    tableService: new AccountsPayableService(),
})
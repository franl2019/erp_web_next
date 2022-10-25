import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_accountReceivableType from "@/components/table/components/renderer/table_accountReceivableType.vue";
import Table_CodeType from "@/components/table/components/renderer/table_CodeType.vue";
import {AccountReceivableService} from "@/module/accountReceivable/accountReceivable.service";
import {IAccountsReceivableFind} from "@/module/accountReceivable/accountReceivable";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const selectAccountInComeSheetMxTableConfig = ref<ITableConfig<IAccountsReceivableFind>>({
    tableName: "selectAccountInComeSheetMxTableConfig",
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
        {headerName: '客户', field: 'clientname'},
        {headerName: '相关单号', field: 'correlationCode'},
        {headerName: '单据类型', field: 'correlationType', cellRendererFramework: Table_CodeType},
        {headerName: '应付账款类型', field: 'accountsReceivableType', cellRendererFramework: Table_accountReceivableType},
        {headerName: '单据金额', field: 'amounts', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '已核销金额', field: 'checkedAmounts', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '未核销金额', field: 'notCheckAmounts', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建日期', field: 'createdAt', cellRendererFramework: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改日期', field: 'updatedAt', cellRendererFramework: Table_Date},
    ],
    tableService: new AccountReceivableService(),
})
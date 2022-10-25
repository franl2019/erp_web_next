import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IAccountExpenditureFind} from "@/module/accountExpenditure/accountExpenditure";
import {AccountExpenditureService} from "@/module/accountExpenditure/accountExpenditure.service";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";


export const defaultAccountExpenditureTableConfig = ref<ITableConfig<IAccountExpenditureFind>>({
    tableName: "defaultAccountExpenditureTableConfig",
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
        {headerName: '单据号码', field: 'accountExpenditureCode'},
        {headerName: '供应商名称', field: 'buyname'},
        {headerName: '发生日期', field: 'indate', cellRendererFramework: Table_Date},
        {headerName: '金额', field: 'amount', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '备注', field: 'reMark'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建日期', field: 'createdAt', cellRendererFramework: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改日期', field: 'updatedAt', cellRendererFramework: Table_Date},
        {headerName: '审核', field: 'level1Review', cellRendererFramework: Table_flag},
        {headerName: '审核人', field: 'level1Name'},
        {headerName: '审核时间', field: 'level1Date', cellRendererFramework: Table_Date},
        {headerName: '审核2', field: 'level2Review', cellRendererFramework: Table_flag},
        {headerName: '审核人2', field: 'level2Name'},
        {headerName: '审核时间2', field: 'level2Date', cellRendererFramework: Table_Date},
    ],
    tableService: new AccountExpenditureService(),
})
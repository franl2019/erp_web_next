import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {AccountInComeService} from "@/module/accountInCome/accountInCome.service";
import {IAccountInCome} from "@/module/accountInCome/accountInCome";

export const defaultAccountInComeTableConfig = ref<ITableState<IAccountInCome>>({
    tableName: "defaultAccountInComeTableConfig",
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
        {headerName: '单据号码', field: 'accountInComeCode'},
        {headerName: '客户名称', field: 'clientname'},
        {headerName: '发生日期', field: 'indate', cellRendererFramework: Table_Date},
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
    tableService: new AccountInComeService(),
})
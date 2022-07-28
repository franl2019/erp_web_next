import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IUserAccountMx} from "@/module/user_account_mx/userAccountMx";
import {UserAccountMxService} from "@/module/user_account_mx/userAccountMx.service";

export const defaultUserAccountAuthTableState = ref<ITableState<IUserAccountMx>>({
    tableName: "defaultUserAccountAuthTableState",
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
        {headerName: '账户名称', field: 'accountName'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRendererFramework: Table_Date}
    ],
    tableService: new UserAccountMxService(),
})
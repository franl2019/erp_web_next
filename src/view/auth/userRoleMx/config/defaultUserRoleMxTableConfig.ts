import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IUserRoleMxJoinUser} from "@/module/userRoleMx/userRoleMx";
import {UserRoleMxService} from "@/module/userRoleMx/userRoleMx.service";

export const defaultUserRoleMxTableConfig = ref<ITableConfig<IUserRoleMxJoinUser>>({
    tableName: "defaultUserRoleMxTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection:"single",
        enableCellTextSelection:true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        {headerName: '用户名', field: 'username'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRenderer: Table_Date},
    ],
    tableService: new UserRoleMxService(),
})
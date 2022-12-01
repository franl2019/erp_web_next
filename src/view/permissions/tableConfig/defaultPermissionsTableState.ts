import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IPermissions} from "@/module/permissions/permissions";
import {PermissionsService} from "@/module/permissions/permissions.service";

export const defaultPermissionsTableState = ref<ITableConfig<IPermissions>>({
    tableName: "defaultPermissionsTableState",
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
        {headerName: '唯一代码', field: 'permissionsCode', width: 100},
        {headerName: '权限名称', field: 'permissionsName', width: 200},
        {headerName: '权限类别', field: 'permissionsThemeId', width: 100},
        {headerName: '新增人', field: 'creater', width: 150},
        {
            headerName: '新增时间',
            field: 'createdAt',
            width: 150,
            cellRendererFramework: Table_Date
        },
        {headerName: '修改人', field: 'updater', width: 150},
        {
            headerName: '修改时间',
            field: 'updatedAt',
            width: 150,
            cellRendererFramework: Table_Date
        },
    ],
    tableService: new PermissionsService(),
})
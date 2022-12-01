import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IRolePermissionsMx} from "@/module/rolePermissionsMx/rolePermissionsMx";
import {RolePermissionsMxService} from "@/module/rolePermissionsMx/rolePermissionsMx.service";

export const rolePermissionsMxTableConfig = ref<ITableConfig<IRolePermissionsMx>>({
    tableName: "rolePermissionsMxTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "multiple",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true,
        rowMultiSelectWithClick:true
    },
    columnDefaults: [
        {
            headerName: '',
            field: 'athlete',
            width: 50,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        {
            headerName: '权限编号',
            field: 'permissionsCode',
            width: 80,
        },
        {
            headerName: '权限名称',
            field: 'permissionsName',
            width: 180,
        },
        {
            headerName: '启用',
            field: 'can',
            width: 80,
            cellRendererFramework: Table_flag,
        },
        {
            headerName: '修改人',
            field: 'updater',
            width: 80,
        },
        {
            headerName: '修改时间',
            field: 'updatedAt',
            cellRendererFramework: Table_Date,
            width: 155,
        },
    ],
    tableService: new RolePermissionsMxService(),
})
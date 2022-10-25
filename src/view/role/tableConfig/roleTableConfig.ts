import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {RoleService} from "@/module/role/role.service";
import {IRole} from "@/module/role/role";

export const roleTableConfig = ref<ITableConfig<IRole>>({
    tableName: "roleTableConfig",
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
            headerName: '使用',
            field: 'useflag',
            cellRendererFramework: Table_flag,
            width: 55,
        },
        {
            headerName: '角色名称',
            field: 'roleName',
            width: 80,

        },
        {
            headerName: "角色启用时间",
            field: "useflagDate",
            cellRendererFramework: Table_Date,
            width: 155
        },
        {
            headerName: '创建人',
            field: 'creater',
            width: 80,

        },
        {
            headerName: '创建时间',
            field: 'createdAt',
            cellRendererFramework: Table_Date,
            width: 155,
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
        {
            headerName: '审核',
            field: 'level1review',
            cellRendererFramework: Table_flag,
            width: 55
        },
        {
            headerName: '审核人',
            field: 'level1name',
            width: 80
        },
        {
            headerName: '审核日期',
            field: 'level1date',
            cellRendererFramework: Table_Date,
            width: 155,
        },
        {
            headerName: '财审',
            field: 'level2review',
            cellRendererFramework: Table_flag,
            width: 55,
        },
        {
            headerName: '财审人',
            field: 'level2name',
            width: 80,
        },
        {
            headerName: '财审日期',
            field: 'level2date',
            cellRendererFramework: Table_Date,
            width: 155,
        },

    ],
    tableService: new RoleService(),
})
import {ITableConfig} from "@/components/table/type";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import {ref} from "vue";
import {PermissionsThemeService} from "@/module/permissionsTheme/permissionsTheme.service";

export const permissionsThemeDefaultTableConfig = ref<ITableConfig<IPermissionsTheme>>({
    tableName: "permissionsThemeDefaultTableConfig",
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
        {headerName: '顺序号', field: 'printid',width:80},
        {headerName: "权限类别名称", field: 'permissionsThemeName'},
    ],
    tableService: new PermissionsThemeService()

})
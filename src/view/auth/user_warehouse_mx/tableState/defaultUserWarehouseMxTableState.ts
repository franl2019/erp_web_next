import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {User_warehouse_mxService} from "@/module/user_warehouse_mx/user_warehouse_mx.service";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IUser_warehouse_mx} from "@/module/user_warehouse_mx/user_warehouse_mx";

export const defaultUserWarehouseMxTableState = ref<ITableConfig<IUser_warehouse_mx>>({
    tableName: "defaultUserWarehouseMxTable",
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
        {headerName: '仓库编号', field: 'warehousecode'},
        {headerName: '仓库名称', field: 'warehousename'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRendererFramework: Table_Date},
    ],
    tableService: new User_warehouse_mxService(),
})
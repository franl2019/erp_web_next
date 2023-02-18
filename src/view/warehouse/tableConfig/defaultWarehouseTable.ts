import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {WarehouseService} from "@/module/warehouse/warehouse.service";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IWarehouse} from "@/module/warehouse/warehouse";

export const DefaultWarehouseTable = ref<ITableConfig<IWarehouse>>({
    tableName: "defaultWarehouseTable",
    tableService: new WarehouseService(),
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
        {headerName: '使用', field: 'useflag', cellRenderer: Table_flag},
        {headerName: '仓库编号', field: 'warehousecode'},
        {headerName: '仓库名称', field: 'warehousename'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建日期', field: 'createdAt', cellRenderer: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改日期', field: 'updatedAt', cellRenderer: Table_Date},
    ],
})
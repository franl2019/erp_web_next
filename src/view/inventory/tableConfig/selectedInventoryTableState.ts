import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {InventoryService} from "@/module/inventory/inventory.service";
import {Inventory} from "@/module/inventory/inventory";
import {valueName} from "@/config/valueName";

export const selectedInventoryTableState = ref<ITableConfig<Inventory>>({
    //selectedInventoryTableState
    tableName: "selectInventoryTableState",
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
        {headerName: '仓库名称', field: 'warehousename'},
        {headerName: '客户编号', field: 'clientcode'},
        {headerName: '客户名称', field: 'clientname'},
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订造规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '单位', field: 'unit'},
        {headerName: '库存数量', field: 'qty'},
        {headerName: '包装单位', field: 'packunit'},
        {headerName: '包装数量', field: 'packqty'},
        {headerName: '体积', field: 'm3'},
        {headerName: '长度', field: 'length'},
        {headerName: '宽度', field: 'width'},
        {headerName: '高度', field: 'height'},
        {headerName: '库存备注', field: 'remark'},
        {headerName: '库存明细备注', field: 'remarkmx'},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改时间', field: 'updatedAt', cellRendererFramework: Table_Date},
    ],
    tableService: new InventoryService(),
})
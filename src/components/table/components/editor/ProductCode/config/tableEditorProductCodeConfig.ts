import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {valueName} from "@/config/valueName";
import {ProductService} from "@/module/product/product.service";
import {IProduct} from "@/module/product/product";

export const tableEditorProductCodeConfig = ref<ITableState<IProduct>>({
    tableName: "tableEditorProductCodeConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: false,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        // ensureDomOrder:true,
        //取消拖动出去隐藏
        suppressDragLeaveHidesColumns: true,
    },
    columnDefaults: [
        // {
        //     headerName: "#",
        //     field: 'sn',
        //     valueGetter: "node.rowIndex + 1",
        //     editable: false
        // },
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '单位', field: 'unit'},
        {headerName: '备注', field: 'remark'},
    ],
    tableService: new ProductService()
})
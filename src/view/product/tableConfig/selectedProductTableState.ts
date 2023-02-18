import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {ProductService} from "@/module/product/product.service";
import {IProduct} from "@/module/product/product";
import {valueName} from "@/config/valueName";

export const selectedProductTableState = ref<ITableConfig<IProduct>>({
    //selectedProductTableState
    tableName: "selectProductTableState",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection:"multiple",
        enableCellTextSelection:true,
        suppressDragLeaveHidesColumns: true,
        suppressCellSelection:true
    },
    columnDefaults: [
        {headerName: '使用', field: 'useflag', cellRenderer: Table_flag},
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '单位', field: 'unit'},
        {headerName: '包装单位', field: 'packunit'},
        {headerName: '包装数量', field: 'packqty'},
        {headerName: '体积', field: 'm3'},
        {headerName: '长度', field: 'length'},
        {headerName: '宽度', field: 'width'},
        {headerName: '高度', field: 'height'},
        {headerName: '备注1', field: 'remark1'},
        {headerName: '备注2', field: 'remark2'},
        {headerName: '备注3', field: 'remark3'},
        {headerName: '备注4', field: 'remark4'},
        {headerName: '备注5', field: 'remark5'},
        {headerName: '备注6', field: 'remark6'},
        {headerName: '备注7', field: 'remark7'},
        {headerName: '备注8', field: 'remark8'},
        {headerName: '备注9', field: 'remark9'},
        {headerName: '备注10', field: 'remark10'},
        {headerName: '审核', field: 'level1review', cellRenderer: Table_flag},
        {headerName: '审核人', field: 'level1name'},
        {headerName: '审核日期', field: 'level1date', cellRenderer: Table_Date},
        {headerName: '财审', field: 'level2review', cellRenderer: Table_flag},
        {headerName: '财审人', field: 'level2name'},
        {headerName: '财审日期', field: 'level2date', cellRenderer: Table_Date},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRenderer: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改时间', field: 'updatedAt', cellRenderer: Table_Date},
        {headerName: `${valueName.product}类别`, field: 'productareaname'},
        {headerName: '仓库', field: 'warehouseid'},
    ],
    tableService: new ProductService(),
})
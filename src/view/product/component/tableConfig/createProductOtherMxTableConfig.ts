import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {ProductOtherUnitService} from "@/module/productOtherUnit/productOtherUnit.service";
import {IProductOtherUnitFind} from "@/module/productOtherUnit/productOtherUnit";

export const createProductOtherMxTableConfig = ref<ITableConfig<IProductOtherUnitFind>>({
    tableName: "createProductOtherMxTableConfig",
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
        {headerName: '使用', field: 'useflag', cellRenderer: Table_flag},
        {headerName: '辅助单位', field: 'productOtherUnitName'},
        {headerName: '默认转换率', field: 'defaultConversionRate'},
        {
            headerName: '自定义转换率',
            field: 'conversionRate',
            editable: true,
            type: 'numericColumn',
        },
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
    ],
    tableService: new ProductOtherUnitService(),
})
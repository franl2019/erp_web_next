import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {CurrencyService} from "@/module/currency/currency.service";
import {ICurrency} from "@/module/currency/currency";


export const defaultCurrencyTableConfig = ref<ITableConfig<ICurrency>>({
    tableName: "defaultCurrencyTableConfig",
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
        {headerName: '币种名称', field: 'currencyname'},
        {headerName: '本位币', field: 'standardmoneyflag', cellRenderer: Table_flag},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建日期', field: 'createdAt', cellRenderer: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改日期', field: 'updatedAt', cellRenderer: Table_Date}
    ],
    tableService: new CurrencyService(),
})
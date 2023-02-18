import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {IAccount} from "@/module/account/account";
import {AccountService} from "@/module/account/account.service";

export const defaultAccountTableConfig = ref<ITableConfig<IAccount>>({
    tableName: "defaultAccountTableConfig",
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
        {headerName: '出纳账户编号', field: 'accountCode'},
        {headerName: '出纳账户名称', field: 'accountName'},
        {headerName: '币种', field: 'currencyname'},
        {headerName: '公户', field: 'companyFlag', cellRenderer: Table_flag},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建日期', field: 'createdAt', cellRenderer: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改日期', field: 'updatedAt', cellRenderer: Table_Date}
    ],
    tableService: new AccountService(),
})
import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_accountsVerifySheetType from "@/components/table/components/renderer/table_accountsVerifySheetType.vue";
import {IAccountsVerifySheetFind} from "@/module/accountsVerifySheet/accountsVerifySheet";
import {AccountsVerifySheetService} from "@/module/accountsVerifySheet/accountsVerifySheet.service";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";

export const accountsVerifySheetFindTableConfig = ref<ITableState<IAccountsVerifySheetFind>>({
    tableName: "accountsVerifySheetFindTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "multiple",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        {headerName: '核销单号', field: 'accountsVerifySheetCode'},
        {headerName: '核销类型', field: 'sheetType',cellRendererFramework:Table_accountsVerifySheetType},
        {headerName: '发生日期', field: 'inDate',cellRendererFramework: Table_Date},
        {headerName: '客户', field: 'clientname'},
        {headerName: '转入客户', field: 'clientname_b'},
        {headerName: '供应商', field: 'buyname'},
        {headerName: '转入供应商', field: 'buyname_b'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt',cellRendererFramework: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改时间', field: 'updatedAt',cellRendererFramework: Table_Date},
        {headerName: '审核', field: 'level1Review', cellRendererFramework: Table_flag},
        {headerName: '审核人', field: 'level1Name'},
        {headerName: '审核时间', field: 'level1Date', cellRendererFramework: Table_Date},
    ],
    tableService: new AccountsVerifySheetService()
})
import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {AccountsPayableService} from "@/module/accountsPayable/accountsPayable.service";
import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_DocumentType from "@/components/table/components/renderer/table_documentType.vue";
import Table_accountPayableType from "@/components/table/components/renderer/table_accountPayableType.vue";
export const accountsPayableTableConfig = ref<ITableState<IAccountsPayableFind>>({
    tableName: "accountsPayableTableConfig",
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
        {headerName: '进仓单号', field: 'inboundcode'},
        {headerName: '进仓单类型', field: 'inboundtype',cellRendererFramework:Table_DocumentType},
        {headerName: '供应商编号', field: 'buycode'},
        {headerName: '供应商名称', field: 'buyname'},
        {headerName: '发生日期', field: 'occurrenceDate',cellRendererFramework: Table_Date},
        {headerName: '原始金额', field: 'originalAmount'},
        {headerName: '应付金额', field: 'payableAmount'},
        {headerName: '未付金额', field: 'unPaidAmount'},
        {headerName: '已付金额', field: 'paidAmount'},
        {headerName: '应付账款类型', field: 'payableType',cellRendererFramework:Table_accountPayableType},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt',cellRendererFramework: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改时间', field: 'updatedAt',cellRendererFramework: Table_Date}
    ],
    tableService: new AccountsPayableService()
})
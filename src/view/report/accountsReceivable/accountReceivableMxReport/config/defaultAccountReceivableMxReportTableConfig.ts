import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_CodeType from "@/components/table/components/renderer/table_CodeType.vue";
import Table_NotShowZero from "@/components/table/components/renderer/table_NotShowZero.vue";
import {
    AccountReceivableMxReportService
} from "@/module/report/accountReceivableMxReport/accountReceivableMxReport.service";
import {IAccountReceivableMxReport} from "@/module/report/accountReceivableMxReport/accountReceivableMxReport";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const defaultAccountReceivableMxReportTableConfig = ref<ITableState<IAccountReceivableMxReport>>({
    tableName: "defaultAccountReceivableMxReportTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            // sortable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        {headerName: '客户名称', field: 'clientname'},
        {headerName: '客户编号', field: 'clientcode'},
        {headerName: '业务员', field: 'ymrep'},

        {headerName: '日期', field: 'inDate', cellRendererFramework: Table_Date},
        {headerName: '单据类型', field: 'correlationType', cellRendererFramework: Table_CodeType},
        {headerName: '单据编号', field: 'correlationCode'},

        {
            headerName: '预收',
            field: 'advancesReceived',
            type: 'numericColumn',
            cellRendererFramework: Table_NotShowZero,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '应收',
            field: 'receivables',
            type: 'numericColumn',
            cellRendererFramework: Table_NotShowZero,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '实收',
            field: 'actuallyReceived',
            type: 'numericColumn',
            cellRendererFramework: Table_NotShowZero,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '期末余额',
            field: 'endingBalance',
            type: 'numericColumn',
            cellRendererFramework: Table_NotShowZero,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '摘要', field: 'abstract'},
        {headerName: '备注', field: 'reMark'},

    ],
    tableService: new AccountReceivableMxReportService(),
})
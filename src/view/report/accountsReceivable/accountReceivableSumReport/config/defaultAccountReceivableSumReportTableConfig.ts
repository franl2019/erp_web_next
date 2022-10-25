import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {
    AccountReceivableSumReportService
} from "@/module/report/accountReceivableSumReport/accountReceivableSumReport.service";
import {IAccountReceivableSumReport} from "@/module/report/accountReceivableSumReport/accountReceivableSumReport";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const defaultAccountReceivableSumReportTableConfig = ref<ITableConfig<IAccountReceivableSumReport>>({
    tableName: "defaultAccountReceivableSumReportTableConfig",
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

        {
            headerName: '期初余额',
            field: 'openQty',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '本期应收',
            field: 'receivables',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '本期收款',
            field: 'actuallyReceived',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '期末余额',
            field: 'endingBalance',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        }

    ],
    tableService: new AccountReceivableSumReportService(),
})
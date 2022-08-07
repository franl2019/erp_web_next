import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {AccountPayableSumReportService} from "@/module/report/accountPayableSumReport/accountPayableSumReport.service";
import {IAccountPayableSumReport} from "@/module/report/accountPayableSumReport/accountPayableSumReport";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import Table_BuyInfo from "@/components/table/components/renderer/table_BuyInfo.vue";

export const defaultAccountPayableSumReportTableConfig = ref<ITableState<IAccountPayableSumReport>>({
    tableName: "defaultAccountPayableSumReportTableConfig",
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


        {headerName: '供应商名称', field: 'buyname',cellRendererFramework:Table_BuyInfo},
        {headerName: '供应商编号', field: 'buycode',cellRendererFramework:Table_BuyInfo},


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
            field: 'accountPayable',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '本期收款',
            field: 'actuallyPayment',
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
    tableService: new AccountPayableSumReportService(),
})
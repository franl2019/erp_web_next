import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {AccountPayableMxReportService} from "@/module/report/accountPayableMxReport/accountPayableMxReport.service";
import {IAccountPayableMxReport} from "@/module/report/accountPayableMxReport/accountPayableMxReport";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_CodeType from "@/components/table/components/renderer/table_CodeType.vue";
import Table_BuyInfo from "@/components/table/components/renderer/table_BuyInfo.vue";
import Table_NotShowZero from "@/components/table/components/renderer/table_NotShowZero.vue";

export const defaultAccountPayableMxReportTableConfig = ref<ITableState<IAccountPayableMxReport>>({
    tableName: "defaultAccountPayableMxReportTableConfig",
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
        {headerName: '业务员', field: 'ymrep'},

        {headerName: '日期', field: 'inDate', cellRendererFramework: Table_Date},
        {headerName: '单据类型', field: 'correlationType', cellRendererFramework: Table_CodeType},
        {headerName: '单据编号', field: 'correlationCode'},

        {
            headerName: '预付',
            field: 'advancesPayment',
            type: 'numericColumn',
            cellRendererFramework: Table_NotShowZero,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '应付',
            field: 'accountPayable',
            type: 'numericColumn',
            cellRendererFramework: Table_NotShowZero,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '实付',
            field: 'actuallyPayment',
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
    tableService: new AccountPayableMxReportService(),
})
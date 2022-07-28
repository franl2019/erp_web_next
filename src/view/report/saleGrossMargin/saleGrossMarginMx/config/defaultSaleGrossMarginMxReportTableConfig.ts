import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_NotShowZero from "@/components/table/components/renderer/table_NotShowZero.vue";
import Table_Absolutely from "@/components/table/components/renderer/table_Absolutely.vue";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {ISaleGrossMarginMx} from "@/module/report/saleGrossMarginReport/saleGrossMarginMx";
import {SaleGrossMarginMxReportService} from "@/module/report/saleGrossMarginReport/saleGrossMarginMxReport.service";
import {toFixed4} from "@/components/table/valueGetter/toFixed4";

export const defaultSaleGrossMarginMxReportTableConfig = ref<ITableState<ISaleGrossMarginMx>>({
    tableName: "defaultSaleGrossMarginMxReportTableConfig",
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

        {headerName: '单据号码', field: 'outboundcode'},
        {headerName: '客户编号', field: 'clientcode'},
        {headerName: '客户名称', field: 'clientname'},
        {headerName: '业务员', field: 'ymrep'},
        {headerName: '产品编号', field: 'productcode'},
        {headerName: '产品名称', field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '备注', field: 'remark'},

        {headerName: '日期', field: 'outdate', cellRendererFramework: Table_Date},

        {
            headerName: '数量',
            field: 'priceqty',
            type: 'numericColumn',
            cellRendererFramework: Table_NotShowZero,
            valueGetter: (params) => {
                return toFixed4(params.data[params.colDef.field!])
            }
        },
        {
            headerName: '销售单价',
            field: 'netprice',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },

        {
            headerName: '销售收入',
            field: 'amt',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },

        {
            headerName: '成本单价',
            field: 'weightedAveragePrice_thisMonth',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },

        {
            headerName: '销售成本',
            field: 'amount_saleCost_thisMonth',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },

        {
            headerName: '销售毛利',
            field: 'saleGrossMargin',
            type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },

        {
            headerName: '销售毛利率%',
            field: 'saleGrossMarginRate',
            type: 'numericColumn',
            cellRendererFramework:Table_Absolutely
        },


    ],
    tableService: new SaleGrossMarginMxReportService(),
})
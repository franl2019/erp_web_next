import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {valueName} from "@/config/valueName";
import {
    SaleOutboundProductSummaryReportService
} from "@/module/report/saleOutboundProductSummaryReport/saleOutboundProductSummaryReport.service";
import {
    ISaleOutboundProductSummaryReport
} from "@/module/report/saleOutboundProductSummaryReport/saleOutboundProductSummaryReport";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";

export const saleOutboundProductSummaryReportTableConfig = ref<ITableConfig<ISaleOutboundProductSummaryReport>>({
    tableName: "saleOutboundProductSummaryReportTableConfig",
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
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '定做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '单位', field: 'unit'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '备注', field: 'remark'},
        {headerName: '数量', field: 'priceqty', type: 'numericColumn'},
        {
            headerName: '金额', field: 'amt', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
    ],
    tableService: new SaleOutboundProductSummaryReportService(),
})
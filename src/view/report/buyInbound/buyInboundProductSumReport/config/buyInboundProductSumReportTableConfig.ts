import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {valueName} from "@/config/valueName";
import {IBuyInboundProductSumReport} from "@/module/report/buyInboundProductSumReport/buyInboundProductSumReport";
import {
    BuyInboundProductSumReportService
} from "@/module/report/buyInboundProductSumReport/buyInboundProductSumReport.service";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {ValueGetterParams} from "ag-grid-community";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";

export const buyInboundProductSumReportTableConfig = ref<ITableState<IBuyInboundProductSumReport>>({
    tableName: "buyInboundProductSumReportTableConfig",
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
        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '备注', field: 'remark'},
        {headerName: '数量', field: 'priceqty',type: 'numericColumn'},
        {headerName: '金额', field: 'amt',type: 'numericColumn', valueGetter: (params: ValueGetterParams) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
    ],
    tableService: new BuyInboundProductSumReportService(),
})
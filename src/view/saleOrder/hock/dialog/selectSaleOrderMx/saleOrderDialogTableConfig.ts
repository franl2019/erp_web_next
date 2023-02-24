import {ITableConfig} from "@/components/table/type";
import {valueName} from "@/config/valueName";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {ISaleOrderMxOrSaleOrderOrProductOrAmt} from "@/module/saleOrder/saleOrderMx";
import {CellClassParams, RowClassParams} from "ag-grid-community";
import {SaleOrderMxReportService} from "@/module/report/saleOrderMxReport/saleOrderMxReport.service";
import Table_Date from "@/components/table/components/renderer/table_date.vue";

export function getRowStyle(params: RowClassParams) {
    if (params.data.lineClose === 1) {
        return {color: "red"};
    }
    return null;
}

export function cellStyle(params:CellClassParams) {
    if (
        params.rowIndex > 0 &&
        params.colDef.colId &&
        params.data[params.colDef.colId] === params.api.getDisplayedRowAtIndex(params.rowIndex - 1)!.data[params.colDef.colId]
    ) {
        return { display: "none" };
    }
    return null
}

export const saleOrderMxITableConfig: ITableConfig<ISaleOrderMxOrSaleOrderOrProductOrAmt> = {
    tableName: "saleOrderMxITableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: false,
        },
        rowSelection: "multiple",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        //单头
        {headerName: '客户', field: 'clientname', width: 150,cellStyle},
        {headerName: '销售订单单号', field: 'saleOrderCode', width: 145,cellStyle},
        {headerName: '订货日期', field: 'orderDate', cellRendererFramework: Table_Date, width: 90,hide:true},
        {headerName: '交货日期', field: 'deliveryDate', cellRendererFramework: Table_Date, width: 90,hide:true},
        {headerName: '结算方式', field: 'moneytype', width: 78,hide:true},
        {headerName: '相关号码', field: 'relatednumber', width: 78,hide:true},
        {
            headerName: '总金额', field: 'amt', type: 'numericColumn', width: 120,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            },
            cellStyle
        },
        {headerName: '业务员', field: 'ymrep', width: 68,hide:true},
        {headerName: '备注1', field: 'remark1', width: 90,hide:true},
        {headerName: '备注2', field: 'remark2', width: 90,hide:true},
        {headerName: '备注3', field: 'remark3', width: 90,hide:true},
        {headerName: '备注4', field: 'remark4', width: 90,hide:true},
        {headerName: '备注5', field: 'remark5', width: 90,hide:true},
        //明细
        {headerName: `${valueName.product}编号`, field: 'productcode', width: 100},
        {headerName: `${valueName.product}名称`, field: 'productname', width: 100},
        {headerName: '规格', field: 'spec', width: 80},
        {headerName: '用料', field: 'materials', width: 80},
        {headerName: '订做规格', field: 'spec_d', width: 80},
        {headerName: '现用料', field: 'materials_d', width: 80},
        {headerName: '明细备注', field: 'remarkmx', width: 80},
        {headerName: '批号', field: 'batchNo', width: 80},
        {headerName: '备注', field: 'remark', width: 80},
        {headerName: '数量', field: 'outqty', type: 'numericColumn', width: 120},
        {headerName: '包装件数', field: 'packqty', type: 'numericColumn', width: 80},
        {headerName: '件数', field: 'bzqty', type: 'numericColumn', width: 120},
        {headerName: '计价数量', field: 'priceqty', type: 'numericColumn', width: 120},
        {
            headerName: '单价', field: 'price', type: 'numericColumn', width: 120,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '包件价', field: 'bzprice', type: 'numericColumn', width: 120},
        {headerName: '折扣', field: 'agio', type: 'numericColumn', width: 120},
        {headerName: '折扣2', field: 'agio1', type: 'numericColumn', width: 120},
        {headerName: '折扣3', field: 'agio2', type: 'numericColumn', width: 120},
        {headerName: '浮动价', field: 'floatprice1', type: 'numericColumn', width: 120},
        {headerName: '浮动价2', field: 'floatprice2', type: 'numericColumn', width: 120},
        {headerName: '浮动价3', field: 'floatprice3', type: 'numericColumn', width: 120},
        {
            headerName: '辅助单位',
            field: 'otherUnit',
            width: 78,
        },
        {
            headerName: '转换率',
            field: 'otherUnitConversionRate',
            type: 'numericColumn',
            width: 66
        },
        {
            headerName: '实价', field: 'netprice', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {
            headerName: '金额', field: 'saleOrderMxAmt', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '计价方式', field: 'pricetype'},
        // {headerName: '采购订单号', field: 'buyordercode'},
        {
            headerName: `客制${valueName.product}编号`,
            field: 'kz_productCode',
            width: 150
        },
        {
            headerName: `客制${valueName.product}名称`,
            field: 'kz_productName',
            width: 150
        },
        {
            headerName: '客制规格',
            field: 'kz_spec',
            width: 150
        },
        {
            headerName: '客制用料',
            field: 'kz_materials',
            width: 150
        },
        {
            headerName: '客制定做规格',
            field: 'kz_spec_d',
            width: 150
        },
        {
            headerName: '客制现用料',
            field: 'kz_materials_d',
            width: 150
        },
        {
            headerName: '客制备注',
            field: 'kz_remark',
            width: 150
        },
        {
            headerName: '明细备注1',
            field: 'remark1',
            width: 150
        },
        {
            headerName: '明细备注2',
            field: 'remark2',
            width: 150
        },
        {
            headerName: '明细备注3',
            field: 'remark3',
            width: 150
        },
        {
            headerName: '明细备注4',
            field: 'remark4',
            width: 150
        },
        {
            headerName: '明细备注5',
            field: 'remark5',
            width: 150
        },
    ],
    tableService: new SaleOrderMxReportService()
}
import {ITableConfig} from "@/components/table/type";
import {valueName} from "@/config/valueName";
import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";
import {SaleOrderMxService} from "@/module/saleOrder/saleOrderMx.service";
import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {bignumber, round} from "mathjs";
import TableEditorProductCode from "@/components/table/components/editor/ProductCode/TableEditorProductCode.vue";
import TableRenderPriceType from "@/components/table/components/renderer/tableRenderPriceType.vue";
import TableEditorSelectPriceType from "@/components/table/components/editor/tableEditorSelectPriceType.vue";
import {selectProductInfoValueSetter} from "@/view/buyInbound/tableConfig/BuyInboundCreateViewMxTableConfig";
import {SaleOrderCreateMxAndProductAndAmt} from "@/module/saleOrder/saleOrderCreateMxAndProductAndAmt";
import {SaleOrderUpdateMxAndProductAndAmt} from "@/module/saleOrder/saleOrderUpdateMxAndProductAndAmt";
import SaleOrderMxLineCloseRender from "@/view/saleOrder/tableConfig/render/saleOrderMxLineCloseRender.vue";
import {RowClassParams} from "ag-grid-community";

function valueSetter(params: ValueSetterParams) {
    //判断是否为数字
    if (
        params.newValue !== '' &&
        !isNaN(Number(params.newValue))
    ) {

        const colId = params.column.getColId();
        //给单元格赋值
        params.data[colId] = Number(round(bignumber(params.newValue), 4));
        const paramsData = params.data as SaleOrderCreateMxAndProductAndAmt | SaleOrderUpdateMxAndProductAndAmt;
        paramsData.recountCol(colId)

        //刷新本行
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}

export function getRowStyle(params: RowClassParams) {
    if (params.data.lineClose === 1) {
        return {color: "red"};
    }
    return null;
}

export const editSaleOrderMxTable:ITableConfig<ISaleOrderMx> = {
    tableName: "editSaleOrderMxTable",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: false,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true,
    },
    columnDefaults: [
        {
            headerName: "",
            field: 'rowDrag',
            rowDrag: true,
            editable: false,
            width: 40,
        },
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
            editable: false,
            width: 40
        },
        {
            headerName: `${valueName.product}编号`,
            field: 'productcode',
            cellEditorFramework: TableEditorProductCode,
            editable: true,
            valueSetter: selectProductInfoValueSetter,
            width: 100,
        },
        {
            headerName: `${valueName.product}名称`,
            field: 'productname',
            editable: false,
            width: 100,
        },
        {headerName: '规格', field: 'spec', width: 100,},
        {headerName: '用料', field: 'materials', width: 100,},
        {headerName: '批次号', field: 'batchNo', editable: true, width: 100,},
        {headerName: '订做规格', field: 'spec_d', editable: true, width: 100,},
        {headerName: '现用料', field: 'materials_d', editable: true, width: 100,},
        {headerName: '明细备注', field: 'remarkmx', editable: true, width: 100,},
        {headerName: '备注', field: 'remark', editable: true, width: 100,},
        {
            headerName: '数量',
            field: 'outqty',
            editable: true,
            type: 'numericColumn',
            valueSetter,
            width: 100,
        },
        {headerName: '单位', field: 'unit', width: 50},
        {
            headerName: '包装数量',
            field: 'packqty',
            type: 'numericColumn',
            width: 100,
        },
        {
            headerName: '件数',
            field: 'bzqty',
            editable: true,
            type: 'numericColumn',
            valueSetter,
            width: 100,
        },
        {
            headerName: '单价',
            field: 'price',
            editable: true,
            type: 'numericColumn',
            valueSetter,
            width: 100,
        },
        {
            headerName: '包件价',
            field: 'bzprice',
            editable: true,
            type: 'numericColumn',
            valueSetter,
            width: 100,
        },
        {
            headerName: '折扣1',
            field: 'agio',
            editable: true,
            type: 'numericColumn',
            valueSetter,
            width: 100,
        },
        {
            headerName: '折扣2',
            field: 'agio1',
            editable: true,
            type: 'numericColumn',
            valueSetter,
            width: 100,
        },
        {
            headerName: '折扣3',
            field: 'agio2',
            editable: true,
            type: 'numericColumn',
            valueSetter,
            width: 100,
        },
        {
            headerName: '实价',
            field: 'netprice',
            editable: true,
            type: 'numericColumn',
            valueSetter
        },
        {
            headerName: '计价数量',
            field: 'priceqty',
            type: 'numericColumn',
        },
        {
            headerName: '金额',
            field: 'amt',
            type: 'numericColumn',
            editable: true,
            valueSetter
        },
        {
            headerName: '计价方式',
            field: 'pricetype',
            width: 100,
            editable:true,
            singleClickEdit:true,
            cellRendererFramework:TableRenderPriceType,
            cellEditorFramework:TableEditorSelectPriceType,
        },
        {
            headerName:"行关闭",
            field:"lineClose",
            editable:false,
            cellRendererFramework:SaleOrderMxLineCloseRender,
            width:65,
            hide:true
        },
    ],
    tableService: new SaleOrderMxService()
}
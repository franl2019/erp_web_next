import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {IInboundMx} from "@/module/inboundMx/IInboundMx";
import {BuyInboundMxService} from "@/module/buyInbound/service/BuyInboundMx.service";
import {valueName} from "@/config/valueName";
import TableEditorProductCode from "@/components/table/components/editor/ProductCode/TableEditorProductCode.vue";
import {bignumber, round} from "mathjs";
import {ErpInboundMxMath} from "@/module/math/erpInboundMxMath";
import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {BuyInboundMxCreateInTableDto} from "@/module/buyInbound/dto/inboundMx/buyInboundMxCreateInTable.dto";

function valueSetter(params: ValueSetterParams) {
    //判断是否为数字
    if (!isNaN(Number(params.newValue))) {
        //给单元格赋值
        params.data[params.column.getColId()] = Number(round(bignumber(params.newValue), 4));

        //为相关的单元格计算
        new ErpInboundMxMath(params).calculate();

        //刷新本行
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}

export function selectProductInfoValueSetter(params: ValueSetterParams) {

    if (params.newValue && params.newValue.productid !== 0) {
        BuyInboundMxCreateInTableDto.useFormatProductToInboundMx(
            params.newValue, params.data
        );
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}

export const BuyInboundCreateViewMxTableConfig = ref<ITableConfig<IInboundMx>>({
    tableName: "buyInboundCreateViewMxTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        // ensureDomOrder:true,
        //取消拖动出去隐藏
        suppressDragLeaveHidesColumns: true,
    },
    columnDefaults: [
        {
            headerName: "",
            field: 'rowDrag',
            rowDrag: true,
            editable: false,
        },
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
            editable: false
        },
        {
            headerName: `${valueName.product}编号`,
            field: 'productcode',
            cellEditorFramework: TableEditorProductCode,
            editable: true,
            valueSetter: selectProductInfoValueSetter
        },
        {
            headerName: `${valueName.product}名称`,
            field: 'productname',
            editable: false
        },
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订做规格', field: 'spec_d', editable: true},
        {headerName: '现用料', field: 'materials_d', editable: true},
        {headerName: '明细备注', field: 'remarkmx', editable: true},
        {headerName: '备注', field: 'remark', editable: true},
        {headerName: '数量', field: 'inqty', editable: true, valueSetter},
        {headerName: '单位', field: 'unit'},
        {headerName: '包装数量', field: 'packqty'},
        {headerName: '件数', field: 'bzqty', editable: true, valueSetter},
        {headerName: '单价', field: 'price', editable: true, valueSetter},
        {
            headerName: '包件价',
            field: 'bzprice',
            editable: true,
            valueSetter
        },
        {headerName: '折扣1', field: 'agio', editable: true, valueSetter},
        {headerName: '折扣2', field: 'agio1', editable: true, valueSetter},
        {headerName: '折扣3', field: 'agio2', editable: true, valueSetter},
        {
            headerName: '实价',
            field: 'netprice',
            editable: true,
            valueSetter
        },
        {headerName: '计价数量', field: 'priceqty'},
        {headerName: '金额', field: 'amt', editable: true, valueSetter},
        {headerName: '计价方式', field: 'pricetype'},
        {headerName: '采购订单号', field: 'buyordercode'},
        {headerName: '销售订单号', field: 'saleordercode'},
        {headerName: '客户名称', field: 'clientname'},
    ],
    tableService: new BuyInboundMxService()
})
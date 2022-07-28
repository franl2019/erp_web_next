import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {useFormatInboundMxNumber} from "@/utils/tableUtils";
import {IInboundMx} from "@/types/inboundMx/IInboundMx";
import {BuyInboundMxService} from "@/module/buyInbound/service/BuyInboundMx.service";
import {valueName} from "@/config/valueName";

export const BuyInboundCreateViewMxTableConfig = ref<ITableState<IInboundMx>>({
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
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订做规格', field: 'spec_d', editable: true},
        {headerName: '现用料', field: 'materials_d', editable: true},
        {headerName: '明细备注', field: 'remarkmx', editable: true},
        {headerName: '备注', field: 'remark', editable: true},
        {headerName: '数量', field: 'inqty', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '单位', field: 'unit'},
        {headerName: '包装数量', field: 'packqty'},
        {headerName: '件数', field: 'bzqty', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '单价', field: 'price', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '包件价', field: 'bzprice', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '折扣1', field: 'agio', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '折扣2', field: 'agio1', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '折扣3', field: 'agio2', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '实价', field: 'netprice', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '计价数量', field: 'priceqty'},
        {headerName: '金额', field: 'amt', editable: true, valueSetter: (params) => useFormatInboundMxNumber(params)},
        {headerName: '计价方式', field: 'pricetype'},
        {headerName: '采购订单号', field: 'buyordercode'},
        {headerName: '销售订单号', field: 'saleordercode'},
        {headerName: '客户名称', field: 'clientname'},
    ],
    tableService: new BuyInboundMxService()
})
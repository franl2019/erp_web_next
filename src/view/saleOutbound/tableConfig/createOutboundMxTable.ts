import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {useFormatOutboundMxNumber} from "@/utils/tableUtils";
import {SaleOutboundMxService} from "@/module/saleOutbound/service/saleOutboundMx.service";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {valueName} from "@/config/valueName";

export const createOutboundMxTable = ref<ITableConfig<IOutboundMx>>({
    tableName: "createOutboundMxTable",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true,
        stopEditingWhenCellsLoseFocus: false//编辑焦点丢失，自动确认修改
    },
    columnDefaults: [
        {
            rowDrag: true
        },
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
        },
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '备注', field: 'remark'},
        {
            headerName: '数量',
            field: 'outqty',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {headerName: '单位', field: 'unit'},
        {headerName: '包装件数', field: 'packqty', type: 'numericColumn'},
        {
            headerName: '件数',
            field: 'bzqty',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '计量件数',
            field: 'priceqty', type: 'numericColumn'
        },
        {
            headerName: '单价',
            field: 'price',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '浮动价',
            field: 'floatprice1',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '浮动价2',
            field: 'floatprice2',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '浮动价3',
            field: 'floatprice3',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '包件价',
            field: 'bzprice',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '折扣',
            field: 'agio',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '折扣2',
            field: 'agio1',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '折扣3',
            field: 'agio2',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '实价',
            field: 'netprice',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {
            headerName: '金额',
            field: 'amt',
            editable: true,
            type: 'numericColumn',
            valueSetter: (params) => useFormatOutboundMxNumber(params)
        },
        {headerName: '计价方式', field: 'pricetype'},
        {headerName: '采购订单号', field: 'buyordercode'},
        {headerName: '销售订单号', field: 'saleordercode'},
        {headerName: '客户名称', field: 'clientname'},
    ],
    tableService: new SaleOutboundMxService()
})
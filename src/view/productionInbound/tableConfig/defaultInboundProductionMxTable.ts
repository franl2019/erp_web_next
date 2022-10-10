import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {ProductionInboundMxService} from "@/module/productionInbound/service/ProductionInboundMx.service";
import {IInboundMx} from "@/module/inboundMx/IInboundMx";
import {valueName} from "@/config/valueName";

export const defaultInboundProductionMxTable = ref<ITableState<IInboundMx>>({
    tableName:"defaultInboundProductionMxTable",
    gridOptions:{
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection:"single",
        enableCellTextSelection:true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults:[
        {
            headerName: "",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
        },
        {headerName: '客户名称', field: 'clientname'},
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '备注', field: 'remark'},
        {headerName: '数量', field: 'inqty'},
        {headerName: '计价数量', field: 'priceqty'},
        {headerName: '件数', field: 'bzqty'},
        {headerName: '包装件数', field: 'packqty'},
        {headerName: '单价', field: 'price'},
        {headerName: '包件价', field: 'bzprice'},
        {headerName: '折扣1', field: 'agio'},
        {headerName: '折扣2', field: 'agio1'},
        {headerName: '折扣3', field: 'agio2'},
        {headerName: '实价', field: 'netprice'},
        {headerName: '计价方式', field: 'pricetype'},
        {headerName: '采购订单号', field: 'buyordercode'},
        {headerName: '销售订单号', field: 'saleordercode'},


    ],
    tableService:new ProductionInboundMxService()
})
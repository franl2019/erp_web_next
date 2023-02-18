import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {SaleOutboundMxService} from "@/module/saleOutbound/service/saleOutboundMx.service";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {valueName} from "@/config/valueName";
import {ValueSetterParams} from "ag-grid-community/dist/lib/entities/colDef";
import {bignumber, round} from "mathjs";
import {OutboundMxMath} from "@/module/math/OutboundMxMath";
import TableSelectProductOtherUnit from "@/components/table/components/editor/tableEditorSelectProductOtherUnit.vue";
import TableEditorSelectPriceType from "@/components/table/components/editor/tableEditorSelectPriceType.vue";
import TableRenderPriceType from "@/components/table/components/renderer/tableRenderPriceType.vue";

function valueSetter(params: ValueSetterParams) {
    //判断是否为数字
    if (
        params.newValue !== '' &&
        !isNaN(Number(params.newValue))
    ) {
        //给单元格赋值
        params.data[params.column.getColId()] = Number(round(bignumber(params.newValue), 4));

        //为相关的单元格计算
        const outboundMxMath = new OutboundMxMath(params.data);
        outboundMxMath.calculate(params.column.getColId());

        //刷新本行
        params.api.refreshCells({
            rowNodes: [params.node!]
        });
        return true
    } else {
        return false
    }
}

export function useSaleOrderEditorTableConfig() {
    const createOutboundMxTable = ref<ITableConfig<IOutboundMx>>({
        tableName: "createOutboundMxTable",
        gridOptions: {
            defaultColDef: {
                editable: false,//单元表格是否可编辑
                resizable: true,
                sortable: false,
            },
            rowSelection: "single",
            enableCellTextSelection: true,
            suppressDragLeaveHidesColumns: true,
            stopEditingWhenCellsLoseFocus: false,//编辑焦点丢失，自动确认修改

        },
        columnDefaults: [
            {
                rowDrag: true,
                width: 50,
            },
            {
                headerName: "#",
                field: 'sn',
                valueGetter: "node.rowIndex + 1",
                width: 50,
            },
            {headerName: `${valueName.product}编号`, field: 'productcode', width: 100},
            {headerName: `${valueName.product}名称`, field: 'productname', width: 150},
            {headerName: '规格', field: 'spec', width: 100},
            {headerName: '用料', field: 'materials', width: 100},
            {headerName: '订做规格', field: 'spec_d', width: 100, hide: true},
            {headerName: '现用料', field: 'materials_d', width: 100, hide: true},
            {headerName: '明细备注', field: 'remarkmx', width: 100, hide: true},
            {headerName: '批号', field: 'batchNo', width: 100},
            {headerName: '备注', field: 'remark', width: 100},
            {
                headerName: '数量',
                field: 'outqty',
                editable: true,
                type: 'numericColumn',
                width: 100,
                valueSetter
            },
            {
                headerName: '单位',
                field: 'unit',
                width: 50
            },
            {
                headerName: '包装件数',
                field: 'packqty',
                type: 'numericColumn',
                width: 100,
                hide: true,
            },
            {
                headerName: '件数',
                field: 'bzqty',
                editable: true,
                type: 'numericColumn',
                width: 100,
                valueSetter
            },
            {
                headerName: '计价数',
                field: 'priceqty',
                width: 100,
                type: 'numericColumn',
                hide: false,
                editable: true,
                valueSetter
            },
            {
                headerName: '单价',
                field: 'price',
                editable: true,
                type: 'numericColumn',
                width: 100,
                valueSetter
            },
            {
                headerName: '浮动价',
                field: 'floatprice1',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '浮动价2',
                field: 'floatprice2',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '浮动价3',
                field: 'floatprice3',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '包件价',
                field: 'bzprice',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '折扣',
                field: 'agio',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '折扣2',
                field: 'agio1',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '折扣3',
                field: 'agio2',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '实价',
                field: 'netprice',
                editable: true,
                type: 'numericColumn',
                width: 100,
                hide: true,
                valueSetter
            },
            {
                headerName: '金额',
                field: 'amt',
                editable: true,
                type: 'numericColumn',
                width: 150,
                valueSetter
            },
            {
                headerName: '辅助单位',
                field: 'otherUnit',
                editable: true,
                singleClickEdit:true,
                width: 78,
                cellEditorFramework: TableSelectProductOtherUnit,
            },
            {
                headerName: '转换率',
                field: 'otherUnitConversionRate',
                editable: true,
                type: 'numericColumn',
                width: 66,
                valueSetter
            },
            {
                headerName: '计价方式',
                field: 'pricetype',
                width: 100,
                editable:true,
                singleClickEdit:true,
                cellRenderer:TableRenderPriceType,
                cellEditorFramework:TableEditorSelectPriceType,
            },
            {
                headerName: `客制${valueName.product}编号`,
                field: 'kz_productCode',
                editable: true,
                width: 150
            },
            {
                headerName: `客制${valueName.product}名称`,
                field: 'kz_productName',
                editable: true,
                width: 150
            },
            {
                headerName: '客制规格',
                field: 'kz_spec',
                editable: true,
                width: 150
            },
            {
                headerName: '客制用料',
                field: 'kz_materials',
                editable: true,
                width: 150
            },
            {
                headerName: '客制定做规格',
                field: 'kz_spec_d',
                editable: true,
                width: 150
            },
            {
                headerName: '客制现用料',
                field: 'kz_materials_d',
                editable: true,
                width: 150
            },
            {
                headerName: '客制备注',
                field: 'kz_remark',
                editable: true,
                width: 150
            },
            {
                headerName: '备注1',
                field: 'remark1',
                editable: true,
                width: 150
            },
            {
                headerName: '备注2',
                field: 'remark2',
                editable: true,
                width: 150
            },
            {
                headerName: '备注3',
                field: 'remark3',
                editable: true,
                width: 150
            },
            {
                headerName: '备注4',
                field: 'remark4',
                editable: true,
                width: 150
            },
            {
                headerName: '备注5',
                field: 'remark5',
                editable: true,
                width: 150
            },
            {
                headerName: '采购订单号',
                field: 'buyordercode',
                width: 200,
                hide: true,
            },
            {
                headerName: '销售订单号',
                field: 'saleordercode',
                width: 200,
                hide: true,
            },
            {
                headerName: '客户名称',
                field: 'clientname',
                width: 200,
                hide: true,
            },
        ],
        tableService: new SaleOutboundMxService()
    })

    return{
        createOutboundMxTable
    }
}
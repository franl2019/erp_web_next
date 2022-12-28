import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {SaleOutboundMxService} from "@/module/saleOutbound/service/saleOutboundMx.service";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {valueName} from "@/config/valueName";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";

export const defaultOutboundMxTable = ref<ITableConfig<IOutboundMx>>({
    tableName: "defaultOutboundMxTable",
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
        {
            headerName: "#",
            field: 'sn',
            valueGetter: "node.rowIndex + 1",
            width: 50
        },
        {headerName: '客户', field: 'clientname'},
        {headerName: `${valueName.product}编号`, field: 'productcode', width: 100},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '批号', field: 'batchNo'},
        {headerName: '备注', field: 'remark'},
        {headerName: '数量', field: 'outqty', type: 'numericColumn'},
        {headerName: '计价数量', field: 'priceqty', type: 'numericColumn'},
        {headerName: '件数', field: 'bzqty', type: 'numericColumn'},
        {headerName: '包装件数', field: 'packqty', type: 'numericColumn'},
        {
            headerName: '单价', field: 'price', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '包件价', field: 'bzprice', type: 'numericColumn'},
        {headerName: '折扣', field: 'agio', type: 'numericColumn'},
        {headerName: '折扣2', field: 'agio1', type: 'numericColumn'},
        {headerName: '折扣3', field: 'agio2', type: 'numericColumn'},
        {headerName: '浮动价', field: 'floatprice1', type: 'numericColumn'},
        {headerName: '浮动价2', field: 'floatprice2', type: 'numericColumn'},
        {headerName: '浮动价3', field: 'floatprice3', type: 'numericColumn'},
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
            headerName: '金额', field: 'amt', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '计价方式', field: 'pricetype'},
        {headerName: '采购订单号', field: 'buyordercode'},
        {headerName: '销售订单号', field: 'saleordercode'},
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
            headerName: '备注1',
            field: 'remark1',
            width: 150
        },
        {
            headerName: '备注2',
            field: 'remark2',
            width: 150
        },
        {
            headerName: '备注3',
            field: 'remark3',
            width: 150
        },
        {
            headerName: '备注4',
            field: 'remark4',
            width: 150
        },
        {
            headerName: '备注5',
            field: 'remark5',
            width: 150
        },

    ],
    tableService: new SaleOutboundMxService()
})
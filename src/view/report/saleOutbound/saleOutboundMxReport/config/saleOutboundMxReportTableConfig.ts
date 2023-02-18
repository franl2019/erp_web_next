import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {ISaleOutboundMxReport} from "@/module/report/saleOutboundReport/saleOutboundMxReport";
import {SaleOutboundReportService} from "@/module/report/saleOutboundReport/saleOutboundReport.service";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import {valueName} from "@/config/valueName";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";

export const saleOutboundMxReportTableConfig = ref<ITableConfig<ISaleOutboundMxReport>>({
    tableName: "saleOutboundMxReportTableConfig",
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
        {headerName: '出仓日期', field: 'outdate', cellRenderer: Table_Date},
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '客户编号', field: 'clientcode'},
        {headerName: '客户', field: 'clientname'},
        {headerName: '销售单号', field: 'outboundcode'},
        {
            headerName: '总金额', field: 'amt', type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '业务员', field: 'ymrep'},
        {headerName: '销售', field: 'salesman'},
        {headerName: '仓库', field: 'warehousename'},
        {headerName: '数量', field: 'outqty', type: 'numericColumn'},
        {headerName: '单价', field: 'price', type: 'numericColumn'},
        {headerName: '折扣', field: 'agio', type: 'numericColumn'},
        {headerName: '浮动价', field: 'floatprice1', type: 'numericColumn'},
        {headerName: '实价', field: 'netprice', type: 'numericColumn'},
        {
            headerName: '金额', field: 'amt_mx', type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },

        {headerName: '打印次数', field: 'printcount'},
        {headerName: '供应商', field: 'buyname'},
        {headerName: '审核', field: 'level1review', cellRenderer: Table_flag},
        {headerName: '审核人', field: 'level1name'},
        {headerName: '审核日期', field: 'level1date', cellRenderer: Table_Date},
        {headerName: '财审', field: 'level2review', cellRenderer: Table_flag},
        {headerName: '财审人', field: 'level2name'},
        {headerName: '财审日期', field: 'level2date', cellRenderer: Table_Date},
        {headerName: '备注1', field: 'remark1'},
        {headerName: '备注2', field: 'remark2'},
        {headerName: '备注3', field: 'remark3'},
        {headerName: '备注4', field: 'remark4'},
        {headerName: '备注5', field: 'remark5'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRenderer: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改时间', field: 'updatedAt', cellRenderer: Table_Date},


        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '备注', field: 'remark'},
        {headerName: '计价数量', field: 'priceqty'},
        {headerName: '件数', field: 'bzqty'},
        {headerName: '包装件数', field: 'packqty'},
        {headerName: '包件价', field: 'bzprice'},
        {headerName: '浮动价2', field: 'floatprice2'},
        {headerName: '浮动价3', field: 'floatprice3'},
        {headerName: '折扣2', field: 'agio1'},
        {headerName: '折扣3', field: 'agio2'},
        {headerName: '计价方式', field: 'pricetype'},
        {headerName: '采购订单号', field: 'buyordercode'},
        {headerName: '销售订单号', field: 'saleordercode'},
        {headerName: '结算方式', field: 'moneytype'},
        {headerName: '相关号码', field: 'relatednumber'},
    ],
    tableService: new SaleOutboundReportService(),
})
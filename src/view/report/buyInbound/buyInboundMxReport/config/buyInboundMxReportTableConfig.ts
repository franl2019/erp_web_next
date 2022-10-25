import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import {BuyInboundMxReportService} from "@/module/report/buyInboundMxReport/buyInboundMxReport.service";
import {IBuyInboundMxReport} from "@/module/report/buyInboundMxReport/buyInboundMxReport";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import {valueName} from "@/config/valueName";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import Table_BuyInfo from "@/components/table/components/renderer/table_BuyInfo.vue";

export const buyInboundMxReportTableConfig = ref<ITableConfig<IBuyInboundMxReport>>({
    tableName: "buyInboundMxReportTableConfig",
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
        {headerName: '客户名称', field: 'clientname'},
        {headerName: `${valueName.product}编号`, field: 'productcode'},
        {headerName: `${valueName.product}名称`, field: 'productname'},
        {headerName: '规格', field: 'spec'},
        {headerName: '用料', field: 'materials'},
        {headerName: '订做规格', field: 'spec_d'},
        {headerName: '现用料', field: 'materials_d'},
        {headerName: '明细备注', field: 'remarkmx'},
        {headerName: '备注', field: 'remark'},


        {headerName: '进仓单号', field: 'inboundcode'},
        {headerName: '仓库', field: 'warehousename'},
        {headerName: '进仓日期', field: 'indate', cellRendererFramework: Table_Date},
        {headerName: '总金额', field: 'amt', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }},
        {headerName: '数量', field: 'inqty', type: 'numericColumn'},
        {headerName: '计价数量', field: 'priceqty', type: 'numericColumn'},
        {headerName: '件数', field: 'bzqty', type: 'numericColumn'},
        {headerName: '包装件数', field: 'packqty', type: 'numericColumn'},
        {headerName: '单价', field: 'price', type: 'numericColumn'},
        {headerName: '包件价', field: 'bzprice', type: 'numericColumn'},
        {headerName: '折扣', field: 'agio', type: 'numericColumn'},
        {headerName: '折扣2', field: 'agio1', type: 'numericColumn'},
        {headerName: '折扣3', field: 'agio2', type: 'numericColumn'},
        {headerName: '实价', field: 'netprice', type: 'numericColumn'},
        {
            headerName: '金额', field: 'amt_mx', type: 'numericColumn', valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },


        {headerName: '结算方式', field: 'moneytype'},
        {headerName: '相关号码', field: 'relatednumber'},
        {headerName: '打印次数', field: 'printcount'},

        {headerName: '客户', field: 'clientname'},
        {headerName: '供应商', field: 'buyname',cellRendererFramework:Table_BuyInfo},
        {headerName: '审核', field: 'level1review', cellRendererFramework: Table_flag},
        {headerName: '审核人', field: 'level1name'},
        {headerName: '审核日期', field: 'level1date', cellRendererFramework: Table_Date},
        {headerName: '财审', field: 'level2review', cellRendererFramework: Table_flag},
        {headerName: '财审人', field: 'level2name'},
        {headerName: '财审日期', field: 'level2date', cellRendererFramework: Table_Date},
        {headerName: '备注1', field: 'remark1'},
        {headerName: '备注2', field: 'remark2'},
        {headerName: '备注3', field: 'remark3'},
        {headerName: '备注4', field: 'remark4'},
        {headerName: '备注5', field: 'remark5'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRendererFramework: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改时间', field: 'updatedAt', cellRendererFramework: Table_Date},


        {headerName: '计价方式', field: 'pricetype'},
        {headerName: '采购订单号', field: 'buyordercode'},
        {headerName: '销售订单号', field: 'saleordercode'},
    ],
    tableService: new BuyInboundMxReportService(),
})
import {ITableConfig} from "@/components/table/type";
import {ISaleOrder} from "@/module/saleOrder/saleOrder";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";

export const defaultSaleOrderHeadTableConfig:ITableConfig<ISaleOrder> = {
    tableName: "defaultSaleOrderHeadTableConfig",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: false,
            floatingFilter:false,
            filter:false
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true,
        suppressColumnMoveAnimation: false,
    },
    columnDefaults: [
        {headerName: '销售订单单号', field: 'saleOrderCode', width: 145},
        {headerName: '客户', field: 'clientname', width: 145},
        {headerName: '订货日期', field: 'orderDate', cellRendererFramework: Table_Date, width: 90},
        {headerName: '交货日期', field: 'deliveryDate', cellRendererFramework: Table_Date, width: 90},
        {headerName: '结算方式', field: 'moneytype', width: 78},
        {headerName: '相关号码', field: 'relatednumber', width: 78},
        {
            headerName: '金额', field: 'amt', type: 'numericColumn', width: 120,
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '业务员', field: 'ymrep', width: 68},
        {headerName: '备注1', field: 'remark1', width: 90},
        {headerName: '备注2', field: 'remark2', width: 90},
        {headerName: '备注3', field: 'remark3', width: 90},
        {headerName: '备注4', field: 'remark4', width: 90},
        {headerName: '备注5', field: 'remark5', width: 90},
        {headerName: '审核', field: 'level1review', cellRendererFramework: Table_flag, pinned: 'left', width: 50},
        {headerName: '审核人', field: 'level1name', width: 68},
        {headerName: '审核日期', field: 'level1date', cellRendererFramework: Table_Date, width: 90},
        {headerName: '财审', field: 'level2review', cellRendererFramework: Table_flag, pinned: 'left', width: 50},
        {headerName: '财审人', field: 'level2name', width: 68},
        {headerName: '财审日期', field: 'level2date', cellRendererFramework: Table_Date, width: 90},

        {headerName: '终止审核', field: 'stopReview', cellRendererFramework: Table_flag, width: 90},
        {headerName: '终止人', field: 'stopName', width: 68},
        {headerName: '终止日期', field: 'stopDate', cellRendererFramework: Table_Date, width: 90},

        {headerName: '手动完成审核', field: 'manualFinishReview', cellRendererFramework: Table_flag, width: 120},
        {headerName: '手动完成人', field: 'manualFinishName', width: 90},
        {headerName: '手动完成日期', field: 'manualFinishDate', cellRendererFramework: Table_Date, width: 120},

        {headerName: '加急审核', field: 'urgentReview', cellRendererFramework: Table_flag, width: 120},
        {headerName: '加急人', field: 'urgentName', width: 68},
        {headerName: '加急日期', field: 'urgentDate', cellRendererFramework: Table_Date, width: 120},

        {headerName: '创建人', field: 'creater', width: 68},
        {headerName: '创建时间', field: 'createdAt', cellRendererFramework: Table_Date, width: 90},
        {headerName: '修改人', field: 'updater', width: 68},
        {headerName: '修改时间', field: 'updatedAt', cellRendererFramework: Table_Date, width: 90},
        {headerName: '打印次数', field: 'printcount', width: 90},
    ],
    tableService: new SaleOrderService(),
}
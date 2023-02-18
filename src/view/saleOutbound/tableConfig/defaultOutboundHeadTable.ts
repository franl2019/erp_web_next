import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {SaleOutboundService} from "@/module/saleOutbound/service/saleOutbound.service";
import {toFixed2} from "@/components/table/valueGetter/toFixed2";
import {amountInThousands} from "@/components/table/valueGetter/amountInThousands";
import {IOutbound} from "@/module/outbound/types/IOutbound";

export const defaultOutboundHeadTable = ref<ITableConfig<IOutbound>>({
    tableName: "defaultOutboundHeadTable",
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
        {headerName: '销售单号', field: 'outboundcode', width: 145},
        {headerName: '客户', field: 'clientname', width: 145},
        {headerName: '出仓日期', field: 'outdate', cellRenderer: Table_Date, width: 90},
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
        {headerName: '审核', field: 'level1review', cellRenderer: Table_flag, pinned: 'left', width: 50},
        {headerName: '审核人', field: 'level1name', width: 68},
        {headerName: '审核日期', field: 'level1date', cellRenderer: Table_Date, width: 90},
        {headerName: '财审', field: 'level2review', cellRenderer: Table_flag, pinned: 'left', width: 50},
        {headerName: '财审人', field: 'level2name', width: 68},
        {headerName: '财审日期', field: 'level2date', cellRenderer: Table_Date, width: 90},
        {headerName: '创建人', field: 'creater', width: 68},
        {headerName: '创建时间', field: 'createdAt', cellRenderer: Table_Date, width: 90},
        {headerName: '修改人', field: 'updater', width: 68},
        {headerName: '修改时间', field: 'updatedAt', cellRenderer: Table_Date, width: 90},


        {headerName: '打印次数', field: 'printcount', width: 90},
    ],
    tableService: new SaleOutboundService()
})
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
            sortable: true,
        },
        rowSelection: "single",
        enableCellTextSelection: true,
        suppressDragLeaveHidesColumns: true,
        suppressColumnMoveAnimation: false,
    },
    columnDefaults: [
        {headerName: '销售单号', field: 'outboundcode'},
        {headerName: '出仓日期', field: 'outdate', cellRendererFramework: Table_Date},
        {headerName: '结算方式', field: 'moneytype'},
        {headerName: '相关号码', field: 'relatednumber'},
        {
            headerName: '金额', field: 'amt', type: 'numericColumn',
            valueGetter: (params) => {
                return amountInThousands(toFixed2(params.data[params.colDef.field!]))
            }
        },
        {headerName: '打印次数', field: 'printcount'},
        {headerName: '仓库', field: 'warehousename'},
        {headerName: '客户', field: 'clientname'},
        {headerName: '业务员', field: 'ymrep'},
        {headerName: '供应商', field: 'buyname'},
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
    ],
    tableService: new SaleOutboundService()
})
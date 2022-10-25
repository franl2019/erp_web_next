import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {BuyService} from "@/module/buy/buy.service";
import {IBuy} from "@/module/buy/buy";

export const defaultBuyTableState = ref<ITableConfig<IBuy>>({
    tableName: "defaultBuyTable",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection:"single",
        enableCellTextSelection:true,
        suppressDragLeaveHidesColumns: true
    },
    columnDefaults: [
        {headerName: '使用', field: 'useflag', cellRendererFramework: Table_flag},
        {headerName: '供应商编号', field: 'buycode'},
        {headerName: '供应商名称', field: 'buyname'},
        {headerName: '联系人', field: 'contactperson'},
        {headerName: '销售人员', field: 'salesman'},
        {headerName: '业务员', field: 'ymrep'},
        {headerName: '手机', field: 'phone_no'},
        {headerName: '固话', field: 'tel_no'},
        {headerName: '邮箱', field: 'email'},
        {headerName: '地址', field: 'address'},
        {headerName: '结算方式', field: 'moneytype'},
        {headerName: '付款类型', field: 'accountspayabletype'},
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
        {headerName: '备注6', field: 'remark6'},
        {headerName: '备注7', field: 'remark7'},
        {headerName: '备注8', field: 'remark8'},
        {headerName: '备注9', field: 'remark9'},
        {headerName: '备注10', field: 'remark10'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRendererFramework: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改时间', field: 'updatedAt', cellRendererFramework: Table_Date},
        {headerName: '供应商地区', field: 'buyareaid'},
        {headerName: '操作区域', field: 'operateareaid'},
    ],
    tableService: new BuyService(),
})
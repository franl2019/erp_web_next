import {ref} from "vue";
import {ITableConfig} from "@/components/table/type";
import Table_flag from "@/components/table/components/renderer/table_flag.vue";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {ClientService} from "@/module/client/client.service";
import {IClient} from "@/module/client/client";

export const selectClientTableState = ref<ITableConfig<IClient>>({
    tableName: "selectClientTableState",
    gridOptions: {
        defaultColDef: {
            editable: false,//单元表格是否可编辑
            resizable: true,
            sortable: true,
        },
        rowSelection:"single",
        enableCellTextSelection:true,
        suppressDragLeaveHidesColumns: true,
        suppressCellSelection:true
    },
    columnDefaults: [
        {headerName: '使用', field: 'useflag', cellRenderer: Table_flag},
        {headerName: '客户编号', field: 'clientcode'},
        {headerName: '客户名称', field: 'clientname'},//, filter: 'agTextColumnFilter'
        {headerName: '联系人', field: 'contactperson'},
        {headerName: '销售名称', field: 'salesman'},
        {headerName: '业务员', field: 'ymrep'},
        {headerName: '手机号码', field: 'phone_no'},
        {headerName: '电话号码', field: 'tel_no'},
        {headerName: '电子邮箱', field: 'email'},
        {headerName: '地址', field: 'address'},
        {headerName: '客户折扣', field: 'discount'},
        {headerName: '结算方式', field: 'moneytype'},
        {headerName: '币种', field: 'currencyid'},
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
        {headerName: '备注6', field: 'remark6'},
        {headerName: '备注7', field: 'remark7'},
        {headerName: '备注8', field: 'remark8'},
        {headerName: '备注9', field: 'remark9'},
        {headerName: '备注10', field: 'remark10'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建日期', field: 'createdAt', cellRenderer: Table_Date},
        {headerName: '修改人', field: 'updater'},
        {headerName: '修改日期', field: 'updatedAt', cellRenderer: Table_Date},
        {headerName: '客户地区', field: 'clientareaid'},
        {headerName: '操作区域', field: 'operateareaid'},],
    tableService: new ClientService(),
})
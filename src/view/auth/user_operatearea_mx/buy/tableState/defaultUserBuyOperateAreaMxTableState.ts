import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import Table_Date from "@/components/table/components/renderer/table_date.vue";
import {User_operatearea_mxService} from "@/module/user_operatearea_mx/user_operatearea_mx.service";
import {IUser_operatearea_mx} from "@/module/user_operatearea_mx/user_operatearea_mx";

export const DefaultUserBuyOperateAreaMxTableState = ref<ITableState<IUser_operatearea_mx>>({
    tableName: "defaultUserBuyOperateAreaMxTableState",
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
        {headerName: '操作区域名称', field: 'operateareaname'},
        {headerName: '创建人', field: 'creater'},
        {headerName: '创建时间', field: 'createdAt', cellRendererFramework: Table_Date},
    ],
    tableService: new User_operatearea_mxService(),
})
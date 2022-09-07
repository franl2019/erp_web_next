import {ref} from "vue";
import {ITableState} from "@/components/table/type";
import {defaultService} from "@/components/table/default/defaultService";

export const defaultConfig = ref<ITableState<any>>({
    tableName: "defaultConfig",
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
        {

        }
    ],
    tableService: new defaultService(),
})
import {
    CellContextMenuEvent,
    ColumnApi,
    GridApi,
    GridReadyEvent,
    NavigateToNextCellParams,
    RowClassParams
} from "ag-grid-community";
import {ITableConfig} from "@/components/table/type";
import {UnwrapRef} from "vue";
import {IInbound} from "@/module/inbound/IInbound";

export class Table {

    public gridApi: GridApi | null = null;
    public columnApi: ColumnApi | null = null;
    private canRightClickFilter: boolean = false;
    private readonly tableConfig: UnwrapRef<ITableConfig<IInbound>>;
    private readonly findDto: {};

    constructor(
        tableConfig: UnwrapRef<ITableConfig<IInbound>>,
        findDto: {},
    ) {
        this.tableConfig = tableConfig;
        this.findDto = findDto;
    }

    private get tableName() {
        return this.tableConfig.tableName
    }

    private get tableService() {
        return this.tableConfig.tableService
    }

    //导航到下一个单元格
    public onNavigateToNextCell(params: NavigateToNextCellParams) {
        const suggestedNextCell = params.nextCellPosition;

        // this is some code
        const KEY_UP = 38;
        const KEY_DOWN = 40;

        const noUpOrDownKeyPressed = params.key !== KEY_DOWN && params.key !== KEY_UP;
        if (noUpOrDownKeyPressed) {
            return suggestedNextCell;
        }

        params.api.forEachNode((node: any) => {
            if (
                suggestedNextCell
                && node.rowIndex === suggestedNextCell.rowIndex
            ) {
                node.setSelected(true);
            }
        });

        return suggestedNextCell;
    }

    //设置底部栏样式
    public setPinnedBottomRowStyle(params: RowClassParams) {
        if (params.node.rowPinned) {
            return {
                "font-weight": "bold",
                "pointer-events": "none"
            };
        }
    }

    //行拖动结束,重新计算行的序号
    public onRowDragEnd = () => {
        if (this.gridApi) this.gridApi.refreshCells();
    }

    //当表格单元格右键
    public onCellContextMenu(event: CellContextMenuEvent) {
        if (!this.canRightClickFilter) return
        const headerName = event.colDef.headerName || '';
        const colId = event.colDef.colId || '';
    }


    public onGridReady = async (event: GridReadyEvent) => {
        this.gridApi = event.api;
        this.columnApi = event.columnApi;
        //初始化列数据
        //初始化列设置组件
        //通知'表格准备好'事件
        //如果有初始化属性,初始化表格数据
    }

    //初始化表格数据
    public initTableData = async () => {
        if (!this.gridApi) return
        const data = await this.tableService.find(this.findDto);
        this.removeTableData();
        this.gridApi.applyTransaction({add: data});
    }

    //删除表格数据
    public removeTableData = () => {
        if (!this.gridApi) return
        this.gridApi.setRowData([]);
    }


}
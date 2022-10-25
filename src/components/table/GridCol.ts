import {ColDef, ColGroupDef, ColumnApi, GridApi} from "ag-grid-community";
import {ITableColumnState, TableColumnStateService} from "@/module/tableColumnState/tableColumnState.service";
import {ColumnState} from "ag-grid-community/dist/lib/columns/columnModel";


export class GridCol {
    public readonly getGridApi: () => Promise<GridApi>;
    public readonly getColumnApi: () => Promise<ColumnApi>;
    private applyOrder: boolean;
    private readonly tableName: string;
    private readonly canEditCol: string[];
    private defaultColDefine: (ColDef | ColGroupDef)[];
    private readonly tableColumnStateService: TableColumnStateService;


    constructor(
        tableName: string,
        getGridApi: () => Promise<GridApi>,
        getColumnApi: () => Promise<ColumnApi>
    ) {
        this.tableName = tableName;
        this.canEditCol = [];
        this.applyOrder = false;
        this.defaultColDefine = []
        this.getGridApi = getGridApi;
        this.getColumnApi = getColumnApi;
        //表格列状态服务
        this.tableColumnStateService = new TableColumnStateService(tableName);
    }

    //初始化从后端加载表格列配置
    public init = async () => {
        if (this.canEditCol.length === 0) await this.getCanEditColList();
        await this.setColumnDefine();
    }

    public startEditTable = async () => {
        const gridApi = await this.getGridApi();
        //拖动显示
        gridApi.setSuppressRowDrag(false);
        //可以编辑
        for (let i = 0; i < this.canEditCol.length; i++) {
            const col = gridApi.getColumnDef(this.canEditCol[i])
            if (col) col.editable = true;
        }
    }

    public endEditTable = async () => {
        const gridApi = await this.getGridApi();
        //拖动隐藏
        gridApi.setSuppressRowDrag(true);
        //禁止编辑
        for (let i = 0; i < this.canEditCol.length; i++) {
            const col = gridApi.getColumnDef(this.canEditCol[i])
            if (col) col.editable = false;
        }
    }

    public saveColumnDefine = async (tableColumnStates: ITableColumnState[]) => {
        await this.tableColumnStateService.saveColumnState(tableColumnStates)
    }

    public removeColumnDefine = async () => {
        await this.tableColumnStateService.removeColumnState();
        await this.init()
    }

    public getTableColumnState = async () => {
        const tableColumnStateList: ITableColumnState[] = [];
        this.columnDefineListFormatTableColumnStateList(await this.getColDefineFromGrid(), tableColumnStateList);
        this.setSnToTableColumnState(tableColumnStateList);
        return tableColumnStateList
    }

    public setSnToTableColumnState = (tableColumnStateList: ITableColumnState[]) => {
        for (let i = 0; i < tableColumnStateList.length; i++) {
            tableColumnStateList[i].sn = i;
        }
        return tableColumnStateList
    }

    public tableColumnStateListFormatColumnStateList = (tableColumnStateList: ITableColumnState[]): ColumnState[] => {
        const columnStates: ColumnState[] = []
        for (let i = 0; i < tableColumnStateList.length; i++) {
            const tableColumnState = tableColumnStateList[i];
            const columnState: ColumnState = {
                colId: tableColumnState.colId,
                hide: tableColumnState.hide,
                width: tableColumnState.width,
                pinned: tableColumnState.pinned,
                pivot: tableColumnState.pivot,
                pivotIndex: tableColumnState.pivotIndex,
                sort: tableColumnState.sort,
                sortIndex: tableColumnState.sortIndex,
            }
            //如果有顺序,就允许定义列顺序
            if (tableColumnState.sn !== 0) this.applyOrder = true;
            columnStates.push(columnState);
        }
        return columnStates
    }

    public setColumnHeaderName = (columnDefinesFromGird: (ColDef | ColGroupDef)[], tableColumnStateList: ITableColumnState[]) => {
        for (let i = 0; i < columnDefinesFromGird.length; i++) {
            for (let j = 0; j < tableColumnStateList.length; j++) {
                const tableColumnState = tableColumnStateList[j];

                if (
                    this.isColDef(columnDefinesFromGird[i])
                    && this.isColDef(tableColumnState)
                ) {

                    const colDef = columnDefinesFromGird[i] as ColDef;
                    if (colDef.colId === tableColumnState.colId && tableColumnState.headerName && tableColumnState.headerName.length > 0) {
                        colDef.headerName = tableColumnState.headerName;
                    }

                } else {
                    const ColGroupDef = columnDefinesFromGird[i] as ColGroupDef;

                    if (
                        this.isColDef(tableColumnState) &&
                        ColGroupDef.groupId === tableColumnState.colId &&
                        tableColumnState.headerName &&
                        tableColumnState.headerName.length > 0
                    ) {
                        ColGroupDef.headerName = tableColumnState.headerName;
                    }

                    if (ColGroupDef.children.length > 0) {
                        this.setColumnHeaderName(ColGroupDef.children, tableColumnStateList);
                    }
                }
            }


        }
    }

    //获取默认可编辑列
    private getCanEditColList = async () => {
        const colDefs = await this.getColDefineFromGrid();
        for (let i = 0; i < colDefs.length; i++) {
            const col = colDefs[i] as ColDef;
            if (Reflect.has(col, 'colId') && col.colId && col.editable) {
                this.canEditCol.push(col.colId);
            }
        }
    }

    private setColumnDefine = async () => {
        const gridApi = await this.getGridApi();
        const columnApi = await this.getColumnApi();
        //获取数据库中列的定义
        const tableColumnStateList = await this.getColDefineFromService();
        //获取Grid现在的定义
        let columnDefinesFromGird = await this.getColDefineFromGrid();
        //保存默认配置
        if(this.defaultColDefine.length === 0){
            this.defaultColDefine = columnDefinesFromGird;
        }
        //如果获取服务器配置为空 使用本地默认列配置
        if (tableColumnStateList.length === 0) {
            columnDefinesFromGird = this.defaultColDefine
        }
        //把数据库定义设置到Grid定义上面
        this.setColumnHeaderName(columnDefinesFromGird, tableColumnStateList);
        //设置列
        gridApi.setColumnDefs(columnDefinesFromGird);
        //排序
        columnApi.applyColumnState({
            state: this.tableColumnStateListFormatColumnStateList(tableColumnStateList),
            applyOrder: this.applyOrder
        });
    }

    private getColDefineFromGrid = async () => {
        const gridApi = await this.getGridApi();
        console.log(gridApi.getColumnDefs())
        return gridApi.getColumnDefs() as (ColDef | ColGroupDef)[];
    }

    //获取表格列配置
    private getColDefineFromService = async (): Promise<ITableColumnState[]> => {
        return await this.tableColumnStateService.getTableColumnState();
    }

    private isColDef(columnDefine: (ColDef | ColGroupDef)): boolean {
        //type 'colId' is ColDef, 'groupId' is ColGroupDef
        return Reflect.has(columnDefine, 'colId')
    }

    private columnDefineListFormatTableColumnStateList(columnDefineList: (ColDef | ColGroupDef)[], tableColumnStateList: ITableColumnState[]): ITableColumnState[] {
        for (let i = 0; i < columnDefineList.length; i++) {
            const columnDefine = columnDefineList[i];
            const tableColumnState = this.columnDefineFormatTableColumnState(columnDefine);
            tableColumnStateList.push(tableColumnState);

            if (tableColumnState.isGroup) {
                this.columnDefineListFormatTableColumnStateList((columnDefine as ColGroupDef).children, tableColumnStateList);
            }
        }
        return tableColumnStateList
    }

    private columnDefineFormatTableColumnState(columnDefine: ColDef | ColGroupDef): ITableColumnState {
        if (this.isColDef(columnDefine)) {
            return this.colDefFormatTableColumnState(columnDefine)
        } else {
            return this.colGroupFormatTableColumnState(<ColGroupDef>columnDefine)
        }
    }

    //colGroup format to tableColumnState
    private colGroupFormatTableColumnState(columnState: ColGroupDef): ITableColumnState {
        return {
            colId: columnState.groupId || "",
            editable: false,
            isGroup: true,
            headerName: columnState.headerName || "",
            headerClass: "",
            hide: false,
            parentId: "",
            pinned: "",
            pivot: false,
            pivotIndex: 0,
            rowGroup: false,
            rowGroupIndex: 0,
            sn: 0,
            sort: "",
            sortIndex: 0,
            width: 0

        }
    }

    //colDef format to tableColumnState
    private colDefFormatTableColumnState(columnState: ColDef): ITableColumnState {
        return {
            colId: (columnState as ColDef).colId || "",
            editable: (columnState as ColDef).editable as boolean || true,
            isGroup: false,
            headerClass: "",
            headerName: (columnState as ColDef).headerName || "",
            hide: (columnState as ColDef).hide || false,
            parentId: "",
            pinned: (columnState as ColDef).pinned as string || "",
            pivot: (columnState as ColDef).pivot || false,
            pivotIndex: (columnState as ColDef).pivotIndex || 0,
            rowGroup: (columnState as ColDef).rowGroup || false,
            rowGroupIndex: (columnState as ColDef).rowGroupIndex || 0,
            sn: 0,
            sort: (columnState as ColDef).sort! || "",
            sortIndex: (columnState as ColDef).sortIndex || 0,
            width: (columnState as ColDef).width! || 0
        }
    }
}
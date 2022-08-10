import {GridApi, GridOptions, ColDef, ColumnApi} from "ag-grid-community";

export interface ITableRef {
    initTableData: (callback?:Function) => Promise<void>;
    initTableDataList: () => Promise<void>;
    //获取表格Api
    getGridApi: () => GridApi;
    getColumnApi: ()=> ColumnApi;
}

export interface ITableService<T> {
    find: (findDto: any) => Promise<T[]>
}

interface columnDefaults extends ColDef {
    children?: ColDef[];
}

export interface ITableState<T> {
    tableName: string;
    gridOptions: GridOptions;
    columnDefaults:columnDefaults[];
    tableService: ITableService<T>;
}
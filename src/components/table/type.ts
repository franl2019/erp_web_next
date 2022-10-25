import {GridApi, GridOptions, ColDef, ColumnApi, ColGroupDef} from "ag-grid-community";

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

export interface ITableConfig<T> {
    tableName: string;
    gridOptions: GridOptions;
    columnDefaults:(ColDef | ColGroupDef)[];
    tableService: ITableService<T>;
}
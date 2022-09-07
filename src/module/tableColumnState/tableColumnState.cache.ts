import {ColumnState} from "ag-grid-community/dist/lib/columns/columnModel";

class TableColumnStateCache {

    private tableColumnStateCacheMap:Map<string,ColumnState[]> = new Map<string, ColumnState[]>()

    public getCache(key:string){
        const columnState = this.tableColumnStateCacheMap.get(key)
        return JSON.parse(JSON.stringify(columnState || [])) as ColumnState[]
    }

    public setCache(key:string,value:ColumnState[]){
        this.tableColumnStateCacheMap.set(key,value)
    }
}

export const tableColumnStateCache = new TableColumnStateCache();
import {ITableColumnState} from "@/module/tableColumnState/tableColumnState.service";

class TableColumnStateCache {

    private tableColumnStateCacheMap:Map<string,ITableColumnState[]> = new Map<string, ITableColumnState[]>()

    public getCache(key:string){
        const columnState = this.tableColumnStateCacheMap.get(key)
        return JSON.parse(JSON.stringify(columnState || [])) as ITableColumnState[]
    }

    public setCache(key:string,value:ITableColumnState[]){
        this.tableColumnStateCacheMap.set(key,value)
    }
}

export const tableColumnStateCache = new TableColumnStateCache();
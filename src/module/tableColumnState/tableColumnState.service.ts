import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {ElMessage} from "element-plus";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {tableColumnStateCache} from "@/module/tableColumnState/tableColumnState.cache";

export interface ITableColumnState {
    sn: number;
    colId: string;
    editable: boolean;
    headerName: string;
    hide: boolean;
    pinned: boolean | "left" | "right" | null | undefined;
    pivot: boolean;
    pivotIndex: number;
    rowGroup: boolean;
    rowGroupIndex: number;
    sort: 'asc' | 'desc' | null;
    sortIndex: number;
    width: number;
    parentId: string;
    isGroup: boolean;
    headerClass: string;
}

//表格列配置服务
export class TableColumnStateService {

    private readonly tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName
    }

    public async saveColumnState(tableColumnStates: ITableColumnState[]) {
        console.log(tableColumnStates)
        const result = await useHttpPost<IApiResult>(API_URL.TABLE_COLUMN_STATE_ADD, {
            tableName: this.tableName,
            tableColumnState: tableColumnStates
        })

        if (result.code === 200) {
            tableColumnStateCache.setCache(this.tableName, [])
            ElMessage.success("表格设置保存成功");
        } else {
            return Promise.reject(new VerifyParamError(result.msg))
        }
    }

    //重置表格列配置
    public async removeColumnState() {
        const result = await useHttpPost<IApiResult>(API_URL.TABLE_COLUMN_STATE_DELETE, {
            tableName: this.tableName,
        })
        if (result.code === 200) {
            tableColumnStateCache.setCache(this.tableName, [])
            ElMessage.success("表格设置重置成功");
        } else {
            return Promise.reject(new VerifyParamError(result.msg))
        }
    }

    //获取表格列配置
    public async getTableColumnState() {
        if (tableColumnStateCache.getCache(this.tableName).length === 0) {
            const result = await useHttpPost<IApiResult<ITableColumnState>>(API_URL.TABLE_COLUMN_STATE_SELECT, {
                tableName: this.tableName,
            })
            if (result.code === 200 && result.data) {
                tableColumnStateCache.setCache(this.tableName, result.data)
                return result.data;
            } else {
                return Promise.reject(new VerifyParamError(result.msg))
            }
        } else {
            return tableColumnStateCache.getCache(this.tableName);
        }

    }
}
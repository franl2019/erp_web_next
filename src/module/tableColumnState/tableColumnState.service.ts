import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {ElMessage} from "element-plus";
import {ColumnState} from "ag-grid-community/dist/lib/columns/columnModel";
import {VerifyParamError} from "@/error/verifyParamError";
import {tableColumnStateCache} from "@/module/tableColumnState/tableColumnState.cache";
//表格列配置服务
export class TableColumnStateService {

    private readonly tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName
    }

    public async saveColumnState(ColumnState: never[]) {
        const result = await http_post<IApiResult>(API_URL.TABLE_COLUMN_STATE_ADD, {
            tableName: this.tableName,
            tableColumnState: ColumnState
        })

        if (result.code === 200) {
            tableColumnStateCache.setCache(this.tableName,[])
            ElMessage.success("表格设置保存成功");
        } else {
            return Promise.reject(new VerifyParamError(result.msg))
        }
    }

    //重置表格列配置
    public async removeColumnState() {
        const result = await http_post<IApiResult>(API_URL.TABLE_COLUMN_STATE_DELETE, {
            tableName: this.tableName,
        })
        if (result.code === 200) {
            tableColumnStateCache.setCache(this.tableName,[])
            ElMessage.success("表格设置重置成功");
        } else {
            return Promise.reject(new VerifyParamError(result.msg))
        }
    }

    //获取表格列配置
    public async getColumnState() {
        if(tableColumnStateCache.getCache(this.tableName).length ===0){
            const result = await http_post<IApiResult<ColumnState>>(API_URL.TABLE_COLUMN_STATE_SELECT, {
                tableName: this.tableName,
            })
            if (result.code === 200 && result.data) {
                tableColumnStateCache.setCache(this.tableName,result.data)
                return result.data;
            } else {
                return Promise.reject(new VerifyParamError(result.msg))
            }
        }else{
            return tableColumnStateCache.getCache(this.tableName);
        }

    }
}
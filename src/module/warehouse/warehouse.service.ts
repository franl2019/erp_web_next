import {http_post, IApiResult} from "@/api/axios";
import {IWarehouse} from "@/module/warehouse/warehouse";
import {API_URL} from "@/api/url";
import {ICreateWarehouseDto} from "@/module/warehouse/dto/createWarehouse.dto";
import {UpdateWarehouseDto} from "@/module/warehouse/dto/updateWarehouse.dto";
import {VerifyParamError} from "@/error/verifyParamError";

export class WarehouseService {

    public async find() {
        const result = await http_post<IApiResult<IWarehouse>>(API_URL.WAREHOUSE_SELECT);
        if (result.code === 200 && result.data) {

            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查找仓库资料失败"))
        }
    }

    public async find_auth() {

        const result = await http_post<IApiResult<IWarehouse>>(API_URL.WAREHOUSE_SELECT_AUTH);
        if (result.code === 200 && result.data) {

            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查找仓库权限失败"))
        }

    }

    public async find_auth_default(): Promise<IWarehouse> {
        const result = await http_post<IApiResult<IWarehouse>>(API_URL.WAREHOUSE_SELECT_AUTH_DEFAULT);
        if (result.code === 200 && result.data && result.data.length > 0) {
            return result.data[0];
        } else {
            return Promise.reject(new VerifyParamError("查找默认仓库失败"))
        }
    }

    public async create(createDto: ICreateWarehouseDto) {
        const result = await http_post<IApiResult>(API_URL.WAREHOUSE_ADD, createDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("新增仓库资料失败"))
        }
    }

    public async update(updateDto: UpdateWarehouseDto) {
        const result = await http_post<IApiResult>(API_URL.WAREHOUSE_UPDATE, updateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新仓库资料失败"))
        }
    }

    public async delete_data(warehouseid: number) {
        const result = await http_post<IApiResult>(API_URL.WAREHOUSE_DELETE, {
            warehouseid: warehouseid
        });
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除仓库资料失败"))
        }
    }
}
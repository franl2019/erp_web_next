import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IUser_warehouse_mx} from "@/module/user_warehouse_mx/user_warehouse_mx";
import {ICreateUserWarehousePermissionsDto} from "@/module/user_warehouse_mx/dto/createUserWarehousePermissionsDto";
import {IDeleteUserWarehousePermissionsDto} from "@/module/user_warehouse_mx/dto/deleteUserWarehousePermissionsDto";
import {VerifyParamError} from "@/error/verifyParamError";
export class User_warehouse_mxService {

    public async find(findDto: { userid: number }) {
        const result = await http_post<IApiResult<IUser_warehouse_mx>>(API_URL.USER_WAREHOUSE_MX_FIND_INFO, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询用户仓库权限失败"))
        }
    }

    public async create(createDto:ICreateUserWarehousePermissionsDto){
        const result = await http_post<IApiResult<IUser_warehouse_mx>>(API_URL.USER_WAREHOUSE_MX_ADD, createDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("添加用户仓库权限失败"))
        }
    }

    public async delete_data(deleteDto:IDeleteUserWarehousePermissionsDto){
        const result = await http_post<IApiResult<IUser_warehouse_mx>>(API_URL.USER_WAREHOUSE_MX_DELETE, deleteDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("删除用户仓库权限失败"))
        }
    }
}
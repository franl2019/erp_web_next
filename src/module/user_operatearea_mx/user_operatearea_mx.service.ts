import {useHttpPost, IApiResult} from "@/utils/axios";
import {IUser_operatearea_mx} from "@/module/user_operatearea_mx/user_operatearea_mx";
import {API_URL} from "@/config/apiUrl";
import {IDeleteUserOperateAreaDto} from "@/module/user_operatearea_mx/dto/deleteUserOperateArea.dto";
import {
    IFindUserOperateAreaDto
} from "@/module/user_operatearea_mx/dto/findUserClientOperateArea.dto";
import {ICreateUserOperateAreaDto} from "@/module/user_operatearea_mx/dto/createUserOperateArea.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class User_operatearea_mxService {
    public async find(findDto: IFindUserOperateAreaDto) {
        const result = await useHttpPost<IApiResult<IUser_operatearea_mx>>(API_URL.USER_OPERATEAREA_MX_FIND_INFO, findDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject((new VerifyParamError("查询用户，客户操作区域权限失败")))
        }
    }

    //获取用户默认操作区域权限
    public async findDefaultUserOperateArea(){
        const result = await useHttpPost<IApiResult<IUser_operatearea_mx>>(API_URL.USER_OPERATEAREA_MX_DEFAULT);
        if(result.code === 200&&result.data&&result.data.length>0){
            return result.data[0];
        }else{
            return Promise.reject(new VerifyParamError("查找用户默认操作区域失败"));
        }
    }

    public async create(createDto: ICreateUserOperateAreaDto) {
        const result = await useHttpPost<IApiResult>(API_URL.USER_OPERATEAREA_MX_ADD, createDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject((new VerifyParamError("新增用户，客户操作区域权限失败")))
        }
    }

    public async delete_data(deleteDto: IDeleteUserOperateAreaDto) {
        const result = await useHttpPost<IApiResult>(API_URL.USER_OPERATEAREA_MX_DELETE, deleteDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject((new VerifyParamError("删除用户，客户操作区域权限失败")))
        }
    }
}
import {UserRoleMxFindDto} from "@/module/userRoleMx/dto/userRoleMxFind.dto";
import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IUserRoleMxJoinUser} from "@/module/userRoleMx/userRoleMx";
import {UserRoleMxCreateDto} from "@/module/userRoleMx/dto/userRoleMxCreate.dto";
import {UserRoleMxDeleteDto} from "@/module/userRoleMx/dto/userRoleMxDelete.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";

export class UserRoleMxService {

    async find(findDto: UserRoleMxFindDto) {
        const result = await useHttpPost<IApiResult<IUserRoleMxJoinUser>>(API_URL.USER_ROLE_MX_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new Error('查询角色用户明细失败'))
        }
    }

    async create(createDto: UserRoleMxCreateDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.USER_ROLE_MX_CREATE, createDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error('创建角色用户明细失败'))
        }
    }

    async delete_data(deleteDto: UserRoleMxDeleteDto) {
        await useVerifyParam(deleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.USER_ROLE_MX_DELETE, deleteDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error('删除角色用户明细失败'))
        }
    }
}
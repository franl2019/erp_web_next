import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {RolePermissionsMxFindAllDto} from "@/module/rolePermissionsMx/dto/rolePermissionsMxFindAll.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {IRolePermissionsMxJoinPermissions} from "@/module/rolePermissionsMx/rolePermissionsMx";
import {RolePermissionsMxUpdateDto} from "@/module/rolePermissionsMx/dto/rolePermissionsMxUpdate.dto";
import {RolePermissionsMxCreateDto} from "@/module/rolePermissionsMx/dto/rolePermissionsMxCreate.dto";

export class RolePermissionsMxService {

    public async find(rolePermissionsMxFindAllDto:RolePermissionsMxFindAllDto){
       return await this.findAll(rolePermissionsMxFindAllDto);
    }

    public async findAll(rolePermissionsMxFindAllDto:RolePermissionsMxFindAllDto){
        await useVerifyParam(rolePermissionsMxFindAllDto);
        const result = await useHttpPost<IApiResult<IRolePermissionsMxJoinPermissions>>(API_URL.ROLE_PERMISSIONS_MX_FIND_ALL,rolePermissionsMxFindAllDto);
        if(result.code === 200 && result.data){
            return result.data
        }else{
            return Promise.reject(new Error('查询角色权限明细失败'));
        }
    }

    public async update(rolePermissionsMxUpdateDto:RolePermissionsMxUpdateDto){
        await useVerifyParam(rolePermissionsMxUpdateDto);
        const rolePermissionsMxUpdateList =  rolePermissionsMxUpdateDto.rolePermissionsMxList
        for (let i = 0; i < rolePermissionsMxUpdateList.length; i++) {
            const rolePermissionsMx = rolePermissionsMxUpdateList[i];
            const rolePermissionsMxCreateDto = new RolePermissionsMxCreateDto(
                rolePermissionsMx.roleId,
                rolePermissionsMx.permissionsId,
                rolePermissionsMx.updater,
                rolePermissionsMx.updatedAt,
                rolePermissionsMx.can
            )
            await useVerifyParam(rolePermissionsMxCreateDto);
        }
        const result = await useHttpPost<IApiResult>(API_URL.ROLE_PERMISSIONS_MX_UPDATE,rolePermissionsMxUpdateDto);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('保存角色权限失败'))
        }
    }
}
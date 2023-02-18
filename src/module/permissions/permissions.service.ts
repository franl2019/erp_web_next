import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {PermissionsFindAllDto} from "@/module/permissions/dto/permissionsFindAll.dto";
import {PermissionsFindOneDto} from "@/module/permissions/dto/permissionsFindOne.dto";
import {IPermissions} from "@/module/permissions/permissions";
import {PermissionsCreateDto} from "@/module/permissions/dto/permissionsCreate.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {PermissionsUpdateDto} from "@/module/permissions/dto/permissionsUpdate.dto";
import {PermissionsDeleteDto} from "@/module/permissions/dto/permissionsDelete.dto";

export class PermissionsService {

    public async find(findDto: PermissionsFindAllDto): Promise<IPermissions[]> {
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_FIND_ALL, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new Error("查询权限基础资料失败"))
        }
    }

    public async findOne(findDto: PermissionsFindOneDto): Promise<IPermissions> {
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_FIND_ONE, findDto);
        if (result.code === 200 && result.data) {
            return result.data[0]
        } else {
            return Promise.reject(new Error("查询权限单个基础资料失败"))
        }
    }

    public async create(createDto: PermissionsCreateDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_CREATE, createDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error("新增权限基础资料失败"))
        }
    }

    public async update(updateDto: PermissionsUpdateDto) {
        await useVerifyParam(updateDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_UPDATE, updateDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error("更新权限基础资料失败"))
        }
    }

    public async delete_data(deleteDto: PermissionsDeleteDto) {
        await useVerifyParam(deleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_DELETE, deleteDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error("删除权限基础资料失败"))
        }
    }
}
import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";
import {PermissionsThemeCreateDto} from "@/module/permissionsTheme/dto/permissionsThemeCreate.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {PermissionsThemeUpdateDto} from "@/module/permissionsTheme/dto/permissionsThemeUpdate.dto";
import {PermissionsThemeDeleteDto} from "@/module/permissionsTheme/dto/permissionsThemeDelete.dto";
import useErpDialog from "@/components/dialog/useErpDialog";

export class PermissionsThemeService{

    public async find(){
        const result = await useHttpPost<IApiResult<IPermissionsTheme>>(API_URL.PERMISSION_THEME_FIND,{});
        if(result.code === 200 && result.data){
            return result.data
        }else{
            return Promise.reject(new Error('查询权限类别错误'))
        }
    }

    public async create(permissionsThemeCreateDto:PermissionsThemeCreateDto){
        await useVerifyParam(permissionsThemeCreateDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_THEME_CREATE,permissionsThemeCreateDto);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('创建权限类别错误'))
        }
    }

    public async update(permissionsThemeUpdateDto:PermissionsThemeUpdateDto){
        await useVerifyParam(permissionsThemeUpdateDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_THEME_UPDATE,permissionsThemeUpdateDto);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('更新权限类别错误'))
        }
    }

    public async delete_data(permissionsThemeId:number){
        await useErpDialog({message:"是否删除权限类别"})
        const permissionsThemeDeleteDto = new PermissionsThemeDeleteDto();
        permissionsThemeDeleteDto.permissionsThemeId = permissionsThemeId;
        await useVerifyParam(permissionsThemeDeleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.PERMISSION_THEME_DELETE,permissionsThemeDeleteDto);
        if(result.code === 200){
            return true
        }else{
            return Promise.reject(new Error('更新权限类别错误'))
        }
    }

}
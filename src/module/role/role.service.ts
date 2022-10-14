import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {RoleCreateDto} from "@/module/role/dto/roleCreate.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {IRole} from "@/module/role/role";
import {RoleUpdateDto} from "@/module/role/dto/roleUpdate.dto";
import {RoleDeleteDto} from "@/module/role/dto/roleDelete.dto";

export class RoleService {

    public async find() {
        const result = await useHttpPost<IApiResult<IRole>>(API_URL.ROLE_FIND_ALL);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('查询用户角色失败');
        }
    }

    public async create(roleCreateDto: RoleCreateDto) {
        await useVerifyParam(new RoleCreateDto(roleCreateDto));
        const result = await useHttpPost<IApiResult>(API_URL.ROLE_CREATE, roleCreateDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('新增用户角色失败');
        }
    }

    public async update(roleUpdateDto: RoleUpdateDto) {
        await useVerifyParam(new RoleUpdateDto(roleUpdateDto));
        const result = await useHttpPost<IApiResult>(API_URL.ROLE_UPDATE, roleUpdateDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('更新用户角色失败');
        }
    }

    public async delete_data(roleDeleteDto: RoleDeleteDto) {
        await useVerifyParam(new RoleDeleteDto(roleDeleteDto));
        const result = await useHttpPost<IApiResult>(API_URL.ROLE_DELETE, roleDeleteDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('删除用户角色失败');
        }
    }
}
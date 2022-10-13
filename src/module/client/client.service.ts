import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IClient} from "@/module/client/client";
import {IFindClientDto} from "@/module/client/dto/findClient.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class ClientService {
    public async find(findClientDto: IFindClientDto){
        const result = await useHttpPost<IApiResult<IClient>>(API_URL.CLIENT_SELECT, findClientDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询客户资料失败"))
        }
    }

    public async add(addDto: IClient): Promise<Boolean> {
        addDto.discount = Number(addDto.discount);
        const result = await useHttpPost<IApiResult<null>>(API_URL.CLIENT_ADD, addDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("新增客户资料失败"))
        }
    }

    public async update(updateDto: IClient): Promise<Boolean> {
        updateDto.discount = Number(updateDto.discount);
        const result = await useHttpPost<IApiResult<null>>(API_URL.CLIENT_UPDATE, updateDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("更新客户资料失败"))
        }
    }

    public async delete_data(clientid: number): Promise<Boolean> {
        const result = await useHttpPost<IApiResult<null>>(API_URL.CLIENT_DELETE, {clientid: clientid});
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("删除客户资料失败"))
        }
    }

    //审核
    public async level1Review(clientid: number): Promise<Boolean> {
        const result = await useHttpPost<IApiResult<null>>(API_URL.CLIENT_LEVEL1REVIEW, {
            clientid: clientid
        });
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("审核客户资料失败"))
        }
    }

    //撤审
    public async unLevel1Review(clientid: number): Promise<Boolean> {
        const result = await useHttpPost<IApiResult<null>>(API_URL.CLIENT_UN_LEVEL1REVIEW, {
            clientid: clientid
        });
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("撤审客户资料失败"))
        }
    }

    //财务审核
    public async level2Review(clientid: number): Promise<Boolean> {
        const result = await useHttpPost<IApiResult<null>>(API_URL.CLIENT_LEVEL2REVIEW, {
            clientid: clientid
        });
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("财务审核客户资料失败"))
        }
    }

    //财务撤审
    public async unLevel2Review(clientid: number): Promise<Boolean> {
        const result = await useHttpPost<IApiResult<null>>(API_URL.CLIENT_UN_LEVEL2REVIEW, {
            clientid: clientid
        });
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("财务撤审客户资料失败"))
        }
    }
}
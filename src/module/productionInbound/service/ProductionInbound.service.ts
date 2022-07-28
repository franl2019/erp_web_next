import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IProductionInboundTableData} from "@/module/productionInbound/types/IProductionInboundTableData";
import {

    IProductionInboundCreateDto, IProductionInboundFindDto
} from "@/module/productionInbound/types/IProductionInboundService";
import {VerifyParamError} from "@/error/verifyParamError";
export class ProductionInboundService {
    public async find(findDto: IProductionInboundFindDto) {
        const result = await http_post<IApiResult<IProductionInboundTableData>>(API_URL.INBOUND_PRODUCTION_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询进仓单,单头失败"));
        }
    }

    public async create(createDto: IProductionInboundCreateDto) {
        const result = await http_post<IApiResult>(API_URL.INBOUND_PRODUCTION_CREATE, createDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("新增进仓单失败"));
        }
    }

    public async update(updateDto: IProductionInboundCreateDto) {
        const result = await http_post<IApiResult>(API_URL.INBOUND_PRODUCTION_UPDATE, updateDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("修改进仓单失败"))
        }
    }

    public async level1review(inboundId: number) {
        const result = await http_post<IApiResult>(API_URL.INBOUND_PRODUCTION_LEVEL1REVIEW, {inboundid:inboundId});
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("审核进仓单失败"))
        }
    }

    public async unLevel1review(inboundId: number) {
        const result = await http_post<IApiResult>(API_URL.INBOUND_PRODUCTION_UN_LEVEL1REVIEW, {inboundid:inboundId});
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("撤审进仓单失败"))
        }
    }

    public async delete_data(inboundId: number) {
        const result = await http_post<IApiResult>(API_URL.INBOUND_PRODUCTION_DELETE, {inboundid:inboundId});
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("删除进仓单失败"))
        }
    }
}
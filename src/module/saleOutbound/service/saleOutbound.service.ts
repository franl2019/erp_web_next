import {ISaleOutboundFindDataDto} from "@/module/saleOutbound/dto/outbound/saleOutboundFindData.dto";
import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {SaleOutboundDeleteDto} from "@/module/saleOutbound/dto/outbound/saleOutboundDeleteDto";
import {SaleOutboundL1Review} from "@/module/saleOutbound/dto/outbound/saleOutboundL1Review";
import {SaleOutboundL2Review} from "@/module/saleOutbound/dto/outbound/saleOutboundL2Review";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {ISaleOutboundCreateDto} from "@/module/saleOutbound/dto/saleOutboundAndMxCreate.dto";
import {ISaleOutboundUpdateDto} from "@/module/saleOutbound/dto/saleOutboundAndMxUpdate.dto";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IOutbound} from "@/module/outbound/types/IOutbound";
import {SaleOutboundMxCreateDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreate.dto";
import {SaleOutboundMxUpdateDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxUpdate.dto";

export interface ISaleOutboundSheetState {
    completeL1Review: number;
    undoneL1Review: number;
    undoneL2Review: number;
}

interface IOutboundHaveName extends IOutbound {
    clientname: string;
    warehousename: string;
}

export class SaleOutboundService {

    public async find(findDto: ISaleOutboundFindDataDto) {
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult<IOutboundHaveName>>(API_URL.SALE_OUTBOUND_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError('查询出仓单错误'))
        }
    }

    public async findSheetState(findDto: ISaleOutboundFindDataDto) {
        const result = await useHttpPost<IApiResult<ISaleOutboundSheetState>>(API_URL.SALE_OUTBOUND_FIND_SHEET_STATE, findDto);
        if (result.code === 200 && result.sheetCompleteState) {
            return result.sheetCompleteState
        } else {
            return Promise.reject(new VerifyParamError('查询出仓单状态错误'))
        }
    }

    public async create(outboundDto: ISaleOutboundCreateDto) {
        await useVerifyParam(outboundDto);
        await this.verifySaleOutboundMxCreateDto(outboundDto.outboundMx);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_CREATE, outboundDto);
        if (result.code === 200 && result.createResult && result.createResult.id) {
            return result;
        } else {
            return Promise.reject(new VerifyParamError('新增出仓单错误'))
        }
    }

    public async create_l1Review(outboundDto: ISaleOutboundCreateDto) {
        await useVerifyParam(outboundDto);
        await this.verifySaleOutboundMxCreateDto(outboundDto.outboundMx);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_CREATE_L1REVIEW, outboundDto);
        if (result.code === 200) {
            return result;
        } else {
            return Promise.reject(new VerifyParamError('新增出仓单错误'))
        }
    }

    public async update(outboundDto: ISaleOutboundUpdateDto) {
        await useVerifyParam(outboundDto);
        await this.verifySaleOutboundMxUpdateDto(outboundDto.outboundMx);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_UPDATE, outboundDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('更新出仓单错误'))
        }
    }

    public async updateAndL1Review(outboundDto: ISaleOutboundUpdateDto) {
        await useVerifyParam(outboundDto);
        await this.verifySaleOutboundMxUpdateDto(outboundDto.outboundMx);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_UPDATE_L1REVIEW, outboundDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('更新加审核出仓单错误'))
        }
    }

    public async delete_data(outboundid:number) {
        const saleOutboundDeleteDto = new SaleOutboundDeleteDto();
        saleOutboundDeleteDto.outboundid = outboundid;
        await useVerifyParam(saleOutboundDeleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_DELETE, saleOutboundDeleteDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('删除出仓单错误'))
        }
    }

    public async undelete_data(outboundid:number) {
        const saleOutboundDeleteDto = new SaleOutboundDeleteDto();
        saleOutboundDeleteDto.outboundid = outboundid;
        await useVerifyParam(saleOutboundDeleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_UN_DELETE, saleOutboundDeleteDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('取消删除出仓单错误'))
        }
    }

    public async l1Review(outboundid: number) {
        //验证
        const saleOutboundL1Review = new SaleOutboundL1Review();
        saleOutboundL1Review.outboundid = outboundid;
        await useVerifyParam(saleOutboundL1Review);
        //发送
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_L1REVIEW, saleOutboundL1Review);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('审核出仓单错误'))
        }
    }

    public async unL1Review(outboundid: number) {
        //验证
        const saleOutboundL1Review = new SaleOutboundL1Review();
        saleOutboundL1Review.outboundid = outboundid;
        await useVerifyParam(saleOutboundL1Review);
        //发送
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_UN_L1REVIEW, saleOutboundL1Review);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('撤审出仓单错误'))
        }
    }

    public async l2Review(outboundid: number) {
        //验证
        const saleOutboundL2Review = new SaleOutboundL2Review();
        saleOutboundL2Review.outboundid = outboundid;
        await useVerifyParam(saleOutboundL2Review);
        //发送
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_L2REVIEW, saleOutboundL2Review);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('财务审核错误'))
        }
    }

    public async unL2Review(outboundid: number) {
        //验证
        const saleOutboundL2Review = new SaleOutboundL2Review();
        saleOutboundL2Review.outboundid = outboundid;
        await useVerifyParam(saleOutboundL2Review);
        //发送
        const result = await useHttpPost<IApiResult>(API_URL.SALE_OUTBOUND_UN_L2REVIEW, saleOutboundL2Review);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('财务撤审错误'))
        }
    }

    private async verifySaleOutboundMxCreateDto(outboundMxList: IOutboundMx[]) {
        for (let i = 0; i < outboundMxList.length; i++) {
            const outboundMx = outboundMxList[i];
            await useVerifyParam(new SaleOutboundMxCreateDto(outboundMx))
        }
    }

    private async verifySaleOutboundMxUpdateDto(outboundMxList: IOutboundMx[]) {
        for (let i = 0; i < outboundMxList.length; i++) {
            const outboundMx = outboundMxList[i];
            await useVerifyParam(new SaleOutboundMxUpdateDto(outboundMx))
        }
    }
}
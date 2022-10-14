import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {
    IBuyInboundCreateDto,
    IBuyInboundFindDto, IBuyInboundFind
} from "@/module/buyInbound/types/IBuyInboundService";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {BuyInboundFindDto} from "@/module/buyInbound/dto/BuyInboundFindDto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
export class BuyInboundService {
    public async find(findDto: BuyInboundFindDto) {
        await useVerifyParam(findDto)
        const result = await useHttpPost<IApiResult<IBuyInboundFind>>(API_URL.BUY_INBOUND_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询采购进仓单,单头失败"));
        }
    }

    public async findSheetCompleteState(findDto: IBuyInboundFindDto) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_FIND_SHEET_COMPLETE_STATE, findDto);
        if (result.code === 200 && result.sheetCompleteState) {
            return result.sheetCompleteState
        } else {
            return Promise.reject(new VerifyParamError("查询采购进仓单状态失败"));
        }
    }

    public async create(createDto: IBuyInboundCreateDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_CREATE, createDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("新增采购进仓单失败"));
        }
    }

    public async create_l1Review(createDto: IBuyInboundCreateDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_CREATE_L1REVIEW, createDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("新增和审核采购进仓单失败"));
        }
    }

    public async update(updateDto: IBuyInboundCreateDto) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UPDATE, updateDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("修改采购进仓单失败"))
        }
    }

    public async update_l1Review(updateDto: IBuyInboundCreateDto) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UPDATE_L1REVIEW, updateDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("修改和审核采购进仓单失败"))
        }
    }

    public async level1review(inboundid: number) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_L1REVIEW, {inboundid});
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，审核失败"))
        }
    }

    public async unLevel1review(inboundid: number) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UN_L1REVIEW, {inboundid});
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，撤审失败"))
        }
    }

    public async level2review(inboundid: number) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_L2REVIEW, {inboundid});
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，财务审核失败"))
        }
    }

    public async unLevel2review(inboundid: number) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UN_L2REVIEW, {inboundid});
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，撤审财务审核失败"))
        }
    }

    public async delete_data(inboundid: number) {
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_DELETE, {inboundid});
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("删除采购进仓单失败"))
        }
    }
}
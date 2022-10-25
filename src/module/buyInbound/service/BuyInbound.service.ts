import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {BuyInboundFindDto, IBuyInboundFindDto} from "@/module/buyInbound/dto/inbound/buyInboundFind.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {BuyInboundAndMxCreateDto} from "@/module/buyInbound/dto/buyInboundAndMxCreate.dto";
import {IBuyInboundInView} from "@/module/buyInbound/dto/inbound/types/buyInboundInView";
import {BuyInboundAndMxUpdateDto} from "@/module/buyInbound/dto/buyInboundAndMxUpdate.dto";
import {BuyInboundL1ReviewDto} from "@/module/buyInbound/dto/inbound/buyInboundL1Review.dto";
import {BuyInboundL2ReviewDto} from "@/module/buyInbound/dto/inbound/buyInboundL2Review.dto";
import {BuyInboundDeleteDto} from "@/module/buyInbound/dto/inbound/buyInboundDelete.dto";
export class BuyInboundService {
    public async find(findDto: BuyInboundFindDto) {
        await useVerifyParam(findDto)
        const result = await useHttpPost<IApiResult<IBuyInboundInView>>(API_URL.BUY_INBOUND_FIND, findDto);
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

    public async create(createDto: BuyInboundAndMxCreateDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_CREATE, createDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("新增采购进仓单失败"));
        }
    }

    public async create_l1Review(createDto: BuyInboundAndMxCreateDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_CREATE_L1REVIEW, createDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("新增和审核采购进仓单失败"));
        }
    }

    public async update(updateDto: BuyInboundAndMxUpdateDto) {
        await useVerifyParam(updateDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UPDATE, updateDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("修改采购进仓单失败"))
        }
    }

    public async update_l1Review(updateDto: BuyInboundAndMxUpdateDto) {
        await useVerifyParam(updateDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UPDATE_L1REVIEW, updateDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("修改和审核采购进仓单失败"))
        }
    }

    public async level1review(inboundid: number) {
        const buyInboundL1ReviewDto = new BuyInboundL1ReviewDto()
        buyInboundL1ReviewDto.inboundid = inboundid;
        await useVerifyParam(buyInboundL1ReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_L1REVIEW, buyInboundL1ReviewDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，审核失败"))
        }
    }

    public async unLevel1review(inboundid: number) {
        const buyInboundL1ReviewDto = new BuyInboundL1ReviewDto()
        buyInboundL1ReviewDto.inboundid = inboundid;
        await useVerifyParam(buyInboundL1ReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UN_L1REVIEW, buyInboundL1ReviewDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，撤审失败"))
        }
    }

    public async level2review(inboundid: number) {
        const buyInboundL2ReviewDto = new BuyInboundL2ReviewDto();
        buyInboundL2ReviewDto.inboundid = inboundid;
        await useVerifyParam(buyInboundL2ReviewDto);

        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_L2REVIEW, buyInboundL2ReviewDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，财务审核失败"))
        }
    }

    public async unLevel2review(inboundid: number) {
        const buyInboundL2ReviewDto = new BuyInboundL2ReviewDto();
        buyInboundL2ReviewDto.inboundid = inboundid;
        await useVerifyParam(buyInboundL2ReviewDto);

        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_UN_L2REVIEW, buyInboundL2ReviewDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("采购进仓单，撤审财务审核失败"))
        }
    }

    public async delete_data(inboundid: number) {
        const buyInboundDeleteDto = new BuyInboundDeleteDto();
        buyInboundDeleteDto.inboundid = inboundid;
        await useVerifyParam(buyInboundDeleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.BUY_INBOUND_DELETE, buyInboundDeleteDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError("删除采购进仓单失败"))
        }
    }
}
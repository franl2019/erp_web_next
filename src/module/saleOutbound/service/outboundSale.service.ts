import {IFindOutboundDto} from "@/module/saleOutbound/dto/findOutboundSale.dto";
import {http_post, IApiResult} from "@/utils/axios";
import {IFindOutbound} from "@/module/saleOutbound/findOutboundSale";
import {API_URL} from "@/config/apiUrl";
import {IOutboundDto} from "@/module/saleOutbound/dto/outboundSale.dto";
import {IDeleteOutboundDto} from "@/module/saleOutbound/dto/deleteOutboundSale.dto";
import {ILevel1reviewOutboundDto} from "@/module/saleOutbound/dto/level1reviewOutboundSale.dto";
import {ILevel2reviewOutboundDto} from "@/module/saleOutbound/dto/level2reviewOutboundSale.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {ISaleOutboundSheetState} from "@/view/home/saleHome.vue";
export class OutboundSaleService {

    public async find(findDto: IFindOutboundDto) {
        const result = await http_post<IApiResult<IFindOutbound>>(API_URL.SALE_OUTBOUND_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError('查询出仓单错误'))
        }
    }

    public async findSheetState(findDto: IFindOutboundDto) {
        const result = await http_post<IApiResult<ISaleOutboundSheetState>>(API_URL.SALE_OUTBOUND_FIND_SHEET_STATE, findDto);
        if (result.code === 200 && result.sheetCompleteState) {
            return result.sheetCompleteState
        } else {
            return Promise.reject(new VerifyParamError('查询出仓单状态错误'))
        }
    }

    public async create(outboundDto: IOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_CREATE, outboundDto);
        if (result.code === 200) {
            return result;
        } else {
            return Promise.reject(new VerifyParamError('新增出仓单错误'))
        }
    }

    public async create_l1Review(outboundDto: IOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_CREATE_L1REVIEW, outboundDto);
        if (result.code === 200) {
            return result;
        } else {
            return Promise.reject(new VerifyParamError('新增出仓单错误'))
        }
    }

    public async update(outboundDto: IOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_UPDATE, outboundDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('更新出仓单错误'))
        }
    }

    public async updateAndL1Review(outboundDto: IOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_UPDATE_L1REVIEW, outboundDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('更新加审核出仓单错误'))
        }
    }

    public async delete_data(deleteDto: IDeleteOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_DELETE, deleteDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('删除出仓单错误'))
        }
    }

    public async undelete_data(deleteDto: IDeleteOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_UN_DELETE, deleteDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('取消删除出仓单错误'))
        }
    }

    public async l1Review(l1Dto: ILevel1reviewOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_L1REVIEW, l1Dto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('审核出仓单错误'))
        }
    }

    public async unL1Review(l1Dto: ILevel1reviewOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_UN_L1REVIEW, l1Dto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('撤审出仓单错误'))
        }
    }

    public async l2Review(l2Dto: ILevel2reviewOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_L2REVIEW, l2Dto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('财务审核错误'))
        }
    }

    public async unL2Review(l2Dto: ILevel2reviewOutboundDto) {
        const result = await http_post<IApiResult>(API_URL.SALE_OUTBOUND_UN_L2REVIEW, l2Dto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError('财务撤审错误'))
        }
    }
}
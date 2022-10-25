import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {IBuyInboundMxFindDto} from "@/module/buyInbound/dto/inboundMx/types/buyInboundMxFind";
import {IBuyInboundMxInTable} from "@/module/buyInbound/dto/inboundMx/types/buyInboundMxInTable";

export class BuyInboundMxService {
    public async find(findDto: IBuyInboundMxFindDto) {
        const result = await useHttpPost<IApiResult<IBuyInboundMxInTable>>(API_URL.INBOUND_FIND_MX, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询进仓单明细失败"));
        }
    }
}
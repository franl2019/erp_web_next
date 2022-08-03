import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IBuyInboundMxFindDto} from "@/module/buyInbound/types/IBuyInboundService";
import {IBuyInboundMxTableData} from "@/module/buyInbound/types/IBuyInboundMxService";
import {VerifyParamError} from "@/error/verifyParamError";

export class BuyInboundMxService {
    public async find(findDto: IBuyInboundMxFindDto) {
        const result = await http_post<IApiResult<IBuyInboundMxTableData>>(API_URL.INBOUND_FIND_MX, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询进仓单明细失败"));
        }
    }
}
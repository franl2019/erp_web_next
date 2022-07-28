import {FindOutboundMxSaleDto} from "@/module/saleOutbound/dto/findOutboundMxSale.dto";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IOutboundMxTableData} from "@/module/saleOutbound/outboundMxSaleTableData";
import {VerifyParamError} from "@/error/verifyParamError";
export class OutboundMxSaleService {

    public async find(findDto: FindOutboundMxSaleDto) {
        const result = await http_post<IApiResult<IOutboundMxTableData>>(API_URL.OUTBOUND_FIND_MX, findDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError('查询出仓单明细失败'))
        }
    }
}
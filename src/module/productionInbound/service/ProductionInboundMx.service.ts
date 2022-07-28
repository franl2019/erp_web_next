import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IProductionInboundMxTableData} from "@/module/productionInbound/types/IProductionInboundMxTableData";
import {IProductionInboundMxFindDto} from "@/module/productionInbound/types/IProductionInboundService";
import {VerifyParamError} from "@/error/verifyParamError";
export class ProductionInboundMxService {
    public async find(findDto: IProductionInboundMxFindDto) {
        const result = await http_post<IApiResult<IProductionInboundMxTableData>>(API_URL.INBOUND_FIND_MX, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询进仓单明细失败"));
        }
    }
}
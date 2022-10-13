import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IProductionInboundMxTableData} from "@/module/productionInbound/types/IProductionInboundMxTableData";
import {IProductionInboundMxFindDto} from "@/module/productionInbound/types/IProductionInboundService";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class ProductionInboundMxService {
    public async find(findDto: IProductionInboundMxFindDto) {
        const result = await useHttpPost<IApiResult<IProductionInboundMxTableData>>(API_URL.INBOUND_FIND_MX, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询进仓单明细失败"));
        }
    }
}
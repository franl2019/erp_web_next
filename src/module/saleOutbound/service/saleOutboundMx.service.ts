import {SaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {SaleOutboundMxCreateInTableDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreateInTable.dto";
export class SaleOutboundMxService {

    public async find(findDto: SaleOutboundMxFindDto) {
        const result = await useHttpPost<IApiResult<SaleOutboundMxCreateInTableDto>>(API_URL.OUTBOUND_FIND_MX, findDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError('查询出仓单明细失败'))
        }
    }
}
import {useHttpPost, IApiResult} from "@/utils/axios";
import {SaleOutboundMxReportFindDto} from "@/module/report/saleOutboundReport/dto/saleOutboundMxReportFind.dto";
import {API_URL} from "@/config/apiUrl";
import {ISaleOutboundMxReport} from "@/module/report/saleOutboundReport/saleOutboundMxReport";

export class SaleOutboundReportService {

    public async find(findDto:SaleOutboundMxReportFindDto):Promise<ISaleOutboundMxReport[]>{
        const result = await useHttpPost<IApiResult<ISaleOutboundMxReport>>(API_URL.SALE_OUTBOUND_MX_REPORT,findDto);
        if(result.code === 200&& result.data){
            return result.data;
        }else{
            return Promise.reject(new Error('查询销售单明细表失败'))
        }
    }
}
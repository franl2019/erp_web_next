import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {
    ISaleOutboundClientProductSummaryReport
} from "@/module/report/saleOutboundClientProductSummaryReport/saleOutboundClientProductSummaryReport";
import {
    SaleOutboundClientProductSummaryReportFindDto
} from "@/module/report/saleOutboundClientProductSummaryReport/dto/saleOutboundMxReportFind.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";

export class SaleOutboundClientProductSummaryReportService {

    public async find(findDto:SaleOutboundClientProductSummaryReportFindDto):Promise<ISaleOutboundClientProductSummaryReport[]>{
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult<ISaleOutboundClientProductSummaryReport>>(API_URL.SALE_OUTBOUND_CLIENT_PRODUCT_COLLECT_REPORT,findDto);
        if(result.code === 200&& result.data){
            return result.data;
        }else{
            return Promise.reject(new Error('查询销售单汇总表失败'))
        }
    }
}
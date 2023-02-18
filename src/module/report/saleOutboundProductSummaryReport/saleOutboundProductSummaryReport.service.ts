import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {
    ISaleOutboundProductSummaryReport
} from "@/module/report/saleOutboundProductSummaryReport/saleOutboundProductSummaryReport";
import {
    SaleOutboundProductSummaryReportFindDto
} from "@/module/report/saleOutboundProductSummaryReport/dto/saleOutboundProductSummaryReportFind.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";

export class SaleOutboundProductSummaryReportService {

    public async find(findDto:SaleOutboundProductSummaryReportFindDto):Promise<ISaleOutboundProductSummaryReport[]>{
        await useVerifyParam(findDto)
        const result = await useHttpPost<IApiResult<ISaleOutboundProductSummaryReport>>(API_URL.SALE_OUTBOUND_PRODUCT_COLLECT_REPORT,findDto);
        if(result.code === 200&& result.data){
            return result.data;
        }else{
            return Promise.reject(new Error('查询销售单产品汇总表失败'))
        }
    }
}
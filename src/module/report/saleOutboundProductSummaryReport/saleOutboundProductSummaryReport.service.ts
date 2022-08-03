import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {
    ISaleOutboundProductSummaryReport
} from "@/module/report/saleOutboundProductSummaryReport/saleOutboundProductSummaryReport";
import {
    SaleOutboundProductSummaryReportFindDto
} from "@/module/report/saleOutboundProductSummaryReport/dto/saleOutboundProductSummaryReportFind.dto";
import {useVerifyParam} from "@/utils/validate";

export class SaleOutboundProductSummaryReportService {

    public async find(findDto:SaleOutboundProductSummaryReportFindDto):Promise<ISaleOutboundProductSummaryReport[]>{
        await useVerifyParam(findDto)
        const result = await http_post<IApiResult<ISaleOutboundProductSummaryReport>>(API_URL.SALE_OUTBOUND_PRODUCT_COLLECT_REPORT,findDto);
        if(result.code === 200&& result.data){
            return result.data;
        }else{
            return Promise.reject(new Error('查询销售单产品汇总表失败'))
        }
    }
}
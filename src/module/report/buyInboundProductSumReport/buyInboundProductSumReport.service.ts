import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IBuyInboundProductSumReport} from "@/module/report/buyInboundProductSumReport/buyInboundProductSumReport";
import {
    BuyInboundProductSummaryReportFindDto
} from "@/module/report/buyInboundProductSumReport/dto/saleOutboundMxReportFind.dto";

export class BuyInboundProductSumReportService {

    public async find(findDto:BuyInboundProductSummaryReportFindDto):Promise<IBuyInboundProductSumReport[]>{
        const result = await http_post<IApiResult<IBuyInboundProductSumReport>>(API_URL.BUY_INBOUND_PRODUCT_SUM_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data;
        }else{
            return Promise.reject(new Error('查询采购进仓单产品汇总表失败'))
        }
    }

}
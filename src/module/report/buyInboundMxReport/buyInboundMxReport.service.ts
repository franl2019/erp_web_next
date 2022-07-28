import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IBuyInboundMxReport} from "@/module/report/buyInboundMxReport/buyInboundMxReport";
import {SaleOutboundMxReportFindDto} from "@/module/report/buyInboundMxReport/dto/saleOutboundMxReportFind.dto";

export class BuyInboundMxReportService {

    public async find(findDto:SaleOutboundMxReportFindDto):Promise<IBuyInboundMxReport[]>{
        const result = await http_post<IApiResult<IBuyInboundMxReport>>(API_URL.BUY_INBOUND_MX_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data;
        }else{
            return Promise.reject(new Error('查询采购进仓单明细表失败'))
        }
    }

}
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IBuyInboundMxReport} from "@/module/report/buyInboundMxReport/buyInboundMxReport";
import {SaleOutboundMxReportFindDto} from "@/module/report/buyInboundMxReport/dto/saleOutboundMxReportFind.dto";

export class BuyInboundMxReportService {

    public async find(findDto:SaleOutboundMxReportFindDto):Promise<IBuyInboundMxReport[]>{
        const result = await useHttpPost<IApiResult<IBuyInboundMxReport>>(API_URL.BUY_INBOUND_MX_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data;
        }else{
            return Promise.reject(new Error('查询采购进仓单明细表失败'))
        }
    }

}
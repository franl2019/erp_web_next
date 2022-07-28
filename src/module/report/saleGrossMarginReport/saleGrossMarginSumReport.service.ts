import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {ISaleGrossMarginSum} from "@/module/report/saleGrossMarginReport/saleGrossMarginSum";
import {SaleGrossMarginSumFindDto} from "@/module/report/saleGrossMarginReport/dto/saleGrossMarginSumFind.dto";
import {useVerifyParam} from "@/utils/validate";

export class SaleGrossMarginSumReportService {

    public async find(findDto:SaleGrossMarginSumFindDto){
        await useVerifyParam(findDto)
        const result = await http_post<IApiResult<ISaleGrossMarginSum>>(API_URL.SALE_GROSS_MARGIN_SUM_REPORT,findDto);
        if(result.code&&result.data){
            return result.data
        }else {
            return Promise.reject(new Error('查询销售毛利汇总表失败'))
        }
    }
}
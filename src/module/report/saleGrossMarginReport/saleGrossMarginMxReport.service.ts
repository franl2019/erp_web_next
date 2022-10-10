import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {useVerifyParam} from "@/utils/validate";
import {SaleGrossMarginMxFindDto} from "@/module/report/saleGrossMarginReport/dto/saleGrossMarginMxFind.dto";
import {ISaleGrossMarginMx} from "@/module/report/saleGrossMarginReport/saleGrossMarginMx";

export class SaleGrossMarginMxReportService {

    public async find(findDto:SaleGrossMarginMxFindDto){
        await useVerifyParam(findDto)
        const result = await http_post<IApiResult<ISaleGrossMarginMx>>(API_URL.SALE_GROSS_MARGIN_MX_REPORT,findDto);
        if(result.code&&result.data){
            return result.data
        }else {
            return Promise.reject(new Error('查询销售毛利明细表失败'))
        }
    }
}
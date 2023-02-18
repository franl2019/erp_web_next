import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {ISaleGrossMarginSum} from "@/module/report/saleGrossMarginReport/saleGrossMarginSum";
import {SaleGrossMarginSumFindDto} from "@/module/report/saleGrossMarginReport/dto/saleGrossMarginSumFind.dto";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";

export class SaleGrossMarginSumReportService {

    public async find(findDto:SaleGrossMarginSumFindDto){
        await useVerifyParam(findDto)
        const result = await useHttpPost<IApiResult<ISaleGrossMarginSum>>(API_URL.SALE_GROSS_MARGIN_SUM_REPORT,findDto);
        if(result.code&&result.data){
            return result.data
        }else {
            return Promise.reject(new Error('查询销售毛利汇总表失败'))
        }
    }
}
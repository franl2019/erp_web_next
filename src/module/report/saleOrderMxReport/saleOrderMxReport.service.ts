import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {ISaleOrderMxOrSaleOrderOrProductOrAmt} from "@/module/saleOrder/saleOrderMx";
import {SaleOrderMxReportFindDto} from "@/module/report/saleOrderMxReport/saleOrderMxReportFind.dto";

export class SaleOrderMxReportService {

    public async find(findDto: SaleOrderMxReportFindDto) {
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult<ISaleOrderMxOrSaleOrderOrProductOrAmt>>(API_URL.SALE_ORDER_MX_REPORT, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('销售订单明细:查询失败');
        }
    }
}
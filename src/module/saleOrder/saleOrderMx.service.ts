import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {SaleOrderFindMxDto} from "@/module/saleOrder/dto/find/saleOrderMxFind.dto";
import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";

export class SaleOrderMxService {

    public async find(findDto: SaleOrderFindMxDto) {
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult<ISaleOrderMx>>(API_URL.SALE_ORDER_MX_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('销售订单明细:查询失败');
        }
    }
}
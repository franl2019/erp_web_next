import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import useErpDialog from "@/components/dialog/useErpDialog";
import {RoleDeleteDto} from "@/module/role/dto/roleDelete.dto";
import {ISaleOrder} from "@/module/saleOrder/saleOrder";

export class SaleOrderService {

    public async find(findDto:any) {
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult<ISaleOrder>>(API_URL.SALE_ORDER_FIND,findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('查询销售订单失败');
        }
    }

    public async create(createDto: any) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_CREATE, createDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject('新增销售订单失败');
        }
    }

    public async createAndL1Review(createDto: any) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_CREATE_AND_REVIEW, createDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject('新增销售订单失败');
        }
    }

    public async update(updateDto: any) {
        await useVerifyParam(updateDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_UPDATE, updateDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('更新销售订单失败');
        }
    }

    public async delete_data(saleOrderId:number) {
        await useErpDialog({message: "是否删除销售订单"});
        const saleOrderDeleteDto = new RoleDeleteDto(saleOrderId)
        await useVerifyParam(saleOrderDeleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_DELETE, saleOrderDeleteDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('删除销售订单失败');
        }
    }
}
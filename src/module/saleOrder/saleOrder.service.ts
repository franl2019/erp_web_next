import {IApiResult, useHttpPost} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import useErpDialog from "@/components/dialog/useErpDialog";
import {ISaleOrderAndMxDto, ISaleOrderOrClient} from "@/module/saleOrder/saleOrder";
import {SaleOrderFindDto} from "@/module/saleOrder/dto/find/saleOrderFind.dto";
import {SaleOrderReviewDto} from "@/module/saleOrder/dto/find/saleOrderReview.dto";
import {SaleOrderCreateAndMxDto} from "@/module/saleOrder/dto/sheet/saleOrderCreateAndMx.dto";
import {SaleOrderUpdateAndMxDto} from "@/module/saleOrder/dto/sheet/saleOrderUpdateAndMx.dto";
import {SaleOrderStopMxDto} from "@/module/saleOrder/dto/sheet/saleOrderStopMx.dto";
import {SaleOrderLineCloseDto} from "@/module/saleOrder/dto/sheet/saleOrderLineClose.dto";

export class SaleOrderService {

    public async find(findDto: SaleOrderFindDto) {
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult<ISaleOrderOrClient>>(API_URL.SALE_ORDER_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('销售订单:查询失败');
        }
    }

    public async create(createDto: SaleOrderCreateAndMxDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult<ISaleOrderAndMxDto>>(API_URL.SALE_ORDER_CREATE, createDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('销售订单:新增失败');
        }
    }

    public async createAndL1Review(createDto: SaleOrderCreateAndMxDto) {
        await useVerifyParam(createDto);
        const result = await useHttpPost<IApiResult<ISaleOrderAndMxDto>>(API_URL.SALE_ORDER_CREATE_AND_REVIEW, createDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('销售订单:新增并审核失败');
        }
    }

    public async update(updateDto: SaleOrderUpdateAndMxDto) {
        await useVerifyParam(updateDto);
        const result = await useHttpPost<IApiResult<ISaleOrderAndMxDto>>(API_URL.SALE_ORDER_UPDATE, updateDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('销售订单:更新失败');
        }
    }

    public async updateAndL1Review(updateDto: SaleOrderUpdateAndMxDto) {
        await useVerifyParam(updateDto);
        const result = await useHttpPost<IApiResult<ISaleOrderAndMxDto>>(API_URL.SALE_ORDER_UPDATE_AND_REVIEW, updateDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject('销售订单:更新并审核失败');
        }
    }

    public async delete_data(saleOrderId: number) {
        await useErpDialog({message: "是否删除销售订单"});
        const saleOrderDeleteDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderDeleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_DELETE, saleOrderDeleteDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:删除失败');
        }
    }

    public async l1ReviewDto(saleOrderId: number) {
        await useErpDialog({message: "是否审核销售订单"});
        const saleOrderL1ReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderL1ReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_L1REVIEW, saleOrderL1ReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:审核失败');
        }
    }

    public async unl1ReviewDto(saleOrderId: number) {
        await useErpDialog({message: "是否撤销审核销售订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_UN_L1REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:撤销审核失败');
        }
    }

    public async l2ReviewDto(saleOrderId: number) {
        await useErpDialog({message: "是否财务审核销售订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_L2REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:财务审核失败');
        }
    }

    public async unl2ReviewDto(saleOrderId: number) {
        await useErpDialog({message: "是否撤销财务审核销售订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_UN_L2REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:撤销财务审核失败');
        }
    }

    public async stopReview(saleOrderId: number) {
        await useErpDialog({message: "是否关闭订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_STOP_REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:关闭失败');
        }
    }

    public async unStopReview(saleOrderId: number) {
        await useErpDialog({message: "是否撤销关闭订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_UN_STOP_REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:撤销关闭失败');
        }
    }

    public async manualFinishReview(saleOrderId: number) {
        await useErpDialog({message: "是否手动完成销售订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_MANUAL_FINISH_REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:手动完成失败');
        }
    }

    public async unManualFinishReview(saleOrderId: number) {
        await useErpDialog({message: "是否撤销手动完成销售订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_UN_MANUAL_FINISH_REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:撤销手动完成失败');
        }
    }

    public async urgentReview(saleOrderId: number) {
        await useErpDialog({message: "是否加急销售订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_URGENT_REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:加急失败');
        }
    }

    public async unUrgentReview(saleOrderId: number) {
        await useErpDialog({message: "是否撤销加急销售订单"});
        const saleOrderReviewDto = new SaleOrderReviewDto(saleOrderId)
        await useVerifyParam(saleOrderReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_UN_URGENT_REVIEW, saleOrderReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:撤销加急失败');
        }
    }

    public async stopMx(saleOrderId: number,saleOrderMxId:number,stopQty:number) {
        const saleOrderStopMxDto = new SaleOrderStopMxDto(
            saleOrderId,
            saleOrderMxId,
            stopQty)
        await useVerifyParam(saleOrderStopMxDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_STOP_MX, saleOrderStopMxDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:终止明细数量失败');
        }
    }

    public async lineClose(saleOrderId: number,saleOrderMxId:number,lineClose:boolean) {
        const saleOrderLineCloseDto = new SaleOrderLineCloseDto(
            saleOrderId,
            saleOrderMxId,
            lineClose)
        await useVerifyParam(saleOrderLineCloseDto);
        const result = await useHttpPost<IApiResult>(API_URL.SALE_ORDER_LINE_CLOSE, saleOrderLineCloseDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject('销售订单:关闭整行失败');
        }
    }
}
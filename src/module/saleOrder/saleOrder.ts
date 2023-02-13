import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";

export interface ISaleOrder {
    //单据id
    saleOrderId: number;
    //单据编号
    saleOrderCode: string;
    //单据状态
    saleOrderState: saleOrderStateType;
    //订货日期
    orderDate: string;
    //出货日期
    deliveryDate: string;
    //客户id
    clientid: number;
    //仓库id
    warehouseid: number;
    //结算方式
    moneytype: string;
    //相关号码
    relatednumber: string;
    //地址
    address: string;
    //联系人
    contact: string;
    //$订金
    deposit: number;
    //打印次数
    printCount: number;
    //终止审核
    stopReview: number;
    stopName: string;
    stopDate: Date | null;
    //手动完成审核
    manualFinishReview: number;
    manualFinishName: string;
    manualFinishDate: Date | null;
    //加急审核
    urgentReview: number;
    urgentName: string;
    urgentDate: Date | null;
    //销售审核
    level1Review: number;
    level1Name: string;
    level1Date: Date | null;
    //财务审核
    level2Review: number;
    level2Name: string;
    level2Date: Date | null;
    //删除标记
    del_uuid: number;
    deleter: string;
    deletedAt: Date | null;

    creater: string;
    createdAt: Date | null

    updater: string
    updatedAt: Date | null

    remark1:string;
    remark2:string;
    remark3:string;
    remark4:string;
    remark5:string;
}

export interface ISaleOrderOrClient extends ISaleOrder{
    clientName:string
}

export interface ISaleOrderAndMxDto extends ISaleOrder {
    saleOrderMx: ISaleOrderMx[]
}

export enum saleOrderStateType {
    //待审核
    pendingReview = 1,
    //待财务审核
    pendingFinanceReview = 2,
    //进行中
    underWay = 3,
    //已完成
    finish = 4,
    //终止订单
    stop = 5,
    //手动完成
    manualFinish= 6
}
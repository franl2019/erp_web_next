export interface ISaleOrder {
    //单据id
    saleOrderId: number;
    //单据编号
    saleOrderCode: string;
    //单据状态
    saleOrderState: number;
    //订货日期
    orderDate: Date;
    //出货日期
    deliveryDate: Date;
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
    stopDate: Date;
    //手动完成审核
    manualFinishReview: number;
    manualFinishName: string;
    manualFinishDate: Date;
    //加急审核
    urgentReview: number;
    urgentName: string;
    urgentDate: Date;
    //销售审核
    level1Review: number;
    level1Name: string;
    level1Date: Date;
    //财务审核
    level2Review: number;
    level2Name: string;
    level2Date: Date;
    //删除标记
    del_uuid: number;
    deleter: string;
    deletedAt: Date;

    creater:string;
    createdAt:Date | null

    updater:string
    updatedAt:Date | null
}
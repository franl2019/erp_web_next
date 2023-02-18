import {ISaleOrder, ISaleOrderOrClient, saleOrderStateType} from "@/module/saleOrder/saleOrder";
import {IsDateString, IsInt, IsNumber, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {useGetToday} from "@/utils";
import {IsDateStringOrNull} from "@/utils/verifyParam/customValidationDecorators/IsDateStringOrNull";


export class SaleOrderCreateDto implements ISaleOrder {
    //单据id
    saleOrderId: number;
    //单据编号
    saleOrderCode: string;
    //单据状态
    @IsInt()
    saleOrderState: saleOrderStateType;
    //订货日期
    @IsDateString()
    orderDate: string;
    //出货日期
    @IsDateStringOrNull()
    deliveryDate: string;
    //客户id
    @IsInt()
    @NotEquals(0)
    clientid: number;
    clientname: string;
    amt:number;
    //仓库id
    warehouseid: number;
    //结算方式
    @IsString()
    moneytype: string;
    //相关号码
    @IsString()
    relatednumber: string;
    //地址
    @IsString()
    address: string;
    //联系人
    @IsString()
    contact: string;
    //订金
    @IsNumber()
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
    createdAt: Date | null;

    updater: string;
    updatedAt: Date | null;

    @IsString()
    remark1:string;
    @IsString()
    remark2:string;
    @IsString()
    remark3:string;
    @IsString()
    remark4:string;
    @IsString()
    remark5:string;

    constructor() {
        this.saleOrderId = 0;
        this.saleOrderCode = "";
        this.saleOrderState = saleOrderStateType.pendingReview;
        this.orderDate = useGetToday();
        this.deliveryDate = "";
        this.clientid = 0;
        this.clientname = "";
        this.amt = 0;
        this.warehouseid = 0;
        this.moneytype = "";
        this.relatednumber = "";
        this.address = "";
        this.contact = "";
        this.deposit = 0;
        this.printCount = 0;
        this.stopReview = 0;
        this.stopName = "";
        this.stopDate = null;
        this.manualFinishReview = 0;
        this.manualFinishName = "";
        this.manualFinishDate = null;
        this.urgentReview = 0;
        this.urgentName = "";
        this.urgentDate = null;
        this.level1Review = 0;
        this.level1Name = "";
        this.level1Date = null;
        this.level2Review = 0;
        this.level2Name = "";
        this.level2Date = null;
        this.del_uuid = 0;
        this.deleter = "";
        this.deletedAt = null;
        this.creater = "";
        this.createdAt = null;
        this.updater = "";
        this.updatedAt = null;

        this.remark1 = "";
        this.remark2 = "";
        this.remark3 = "";
        this.remark4 = "";
        this.remark5 = "";
    }

    setValue(saleOrder:ISaleOrderOrClient){
        this.saleOrderId = saleOrder.saleOrderId;
        this.saleOrderCode = saleOrder.saleOrderCode;
        this.saleOrderState = saleOrder.saleOrderState;
        this.orderDate = saleOrder.orderDate;
        this.deliveryDate = saleOrder.deliveryDate;
        this.clientid = saleOrder.clientid;
        this.clientname = saleOrder.clientname;
        this.warehouseid = saleOrder.warehouseid;
        this.moneytype = saleOrder.moneytype;
        this.relatednumber = saleOrder.relatednumber;
        this.address = saleOrder.address;
        this.contact = saleOrder.contact;
        this.deposit = saleOrder.deposit;
        this.printCount = saleOrder.printCount;
        this.stopReview = saleOrder.stopReview;
        this.stopName = saleOrder.stopName;
        this.stopDate = saleOrder.stopDate;
        this.manualFinishReview = saleOrder.manualFinishReview;
        this.manualFinishName = saleOrder.manualFinishName;
        this.manualFinishDate = saleOrder.manualFinishDate;
        this.urgentReview = saleOrder.urgentReview;
        this.urgentName = saleOrder.urgentName;
        this.urgentDate = saleOrder.urgentDate;
        this.level1Review = saleOrder.level1Review;
        this.level1Name = saleOrder.level1Name;
        this.level1Date = saleOrder.level1Date;
        this.level2Review = saleOrder.level2Review;
        this.level2Name = saleOrder.level2Name;
        this.level2Date = saleOrder.level2Date;
        this.del_uuid = saleOrder.del_uuid;
        this.deleter = saleOrder.deleter;
        this.deletedAt = saleOrder.deletedAt;
        this.creater = saleOrder.creater;
        this.createdAt = saleOrder.createdAt;
        this.updater = saleOrder.updater;
        this.updatedAt = saleOrder.updatedAt;
        this.remark1 = saleOrder.remark1;
        this.remark2 = saleOrder.remark2;
        this.remark3 = saleOrder.remark3;
        this.remark4 = saleOrder.remark4;
        this.remark5 = saleOrder.remark5;
    }
}
import {ISaleOrder, saleOrderStateType} from "@/module/saleOrder/saleOrder";
import {
    IsDateString,
    IsInt,
    IsNumber,
    IsString,
    NotEquals
} from "@/utils/verifyParam/customValidationDecorators";
import {useGetToday} from "@/utils";


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
    @IsDateString()
    deliveryDate: string;
    //客户id
    @IsInt()
    @NotEquals(0)
    clientid: number;
    //仓库id
    @IsInt()
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
    createdAt: Date | null

    updater: string
    updatedAt: Date | null

    constructor() {
        this.saleOrderId = 0;
        this.saleOrderCode = "";
        this.saleOrderState = saleOrderStateType.pendingReview;
        this.orderDate = useGetToday();
        this.deliveryDate = "";
        this.clientid = 0;
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
    }
}
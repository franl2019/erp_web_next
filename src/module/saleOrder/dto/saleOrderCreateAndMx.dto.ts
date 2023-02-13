import {ISaleOrderAndMxDto} from "@/module/saleOrder/saleOrder";
import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";
import {
    IsArray,
} from "@/utils/verifyParam/customValidationDecorators";
import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";
import {SaleOrderCreateMxDto} from "@/module/saleOrder/dto/mx/saleOrderCreateMx.dto";

export class SaleOrderCreateAndMxDto extends SaleOrderCreateDto implements ISaleOrderAndMxDto{
    @IsArray()
    saleOrderMx: ISaleOrderMx[];

    constructor() {
        super();
        this.saleOrderMx = []
    }

    setSaleOrder(saleOrder:SaleOrderCreateDto){
        this.saleOrderId = saleOrder.saleOrderId;
        this.saleOrderCode = saleOrder.saleOrderCode;
        this.saleOrderState = saleOrder.saleOrderState;
        this.orderDate = saleOrder.orderDate;
        this.deliveryDate = saleOrder.deliveryDate;
        this.clientid = saleOrder.clientid;
        this.clientName = saleOrder.clientName;
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

    setSaleOrderCreateMxList(saleOrderMx:SaleOrderCreateMxDto[]){
        this.saleOrderMx = saleOrderMx
    }
}
import {IsArray, IsDateString, IsInt, IsNumber, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetNullDate, useGetStartDate} from "@/utils";
import {IsDateStringOrNull} from "@/utils/verifyParam/customValidationDecorators/IsDateStringOrNull";

export class SaleOrderMxReportFindDto {
    @IsInt()
    saleOrderId:number = 0;

    @IsString()
    saleOrderCode:string = "";

    @IsDateString()
    startDate:string = useGetStartDate();
    @IsDateString()
    endDate:string = useGetEndDate();

    @IsDateStringOrNull()
    deliveryDate:string = useGetNullDate();

    @IsArray()
    warehouseids:number[] = [];
    @IsInt()
    clientid:number = 0;
    @IsString()
    clientname:string = "";
    @IsString()
    ymrep:string = "";
    @IsInt()
    saleOrderState:number = 0;

    @IsNumber()
    deposit:number = 0

    @IsString()
    moneytype:string = "";
    @IsString()
    relatednumber:string = "";
    @IsInt()
    stopReview:number = -1;
    @IsInt()
    manualFinishReview:number = -1;
    @IsInt()
    urgentReview:number = -1;
    @IsInt()
    level1Review:number = -1;
    @IsInt()
    level2Review:number = -1;

    @IsString()
    remark1:string = "";
    @IsString()
    remark2:string = "";
    @IsString()
    remark3:string = "";
    @IsString()
    remark4:string = "";
    @IsString()
    remark5:string = "";
    @IsString()
    salesman:string = ""

    @IsInt()
    productId:number = 0

    @IsString()
    productCode:string = ""

    @IsString()
    productName:string = ""

    @IsInt()
    lineClose:number = -1;

    constructor() {

    }

    public setValue(findDto:SaleOrderMxReportFindDto){
        this.saleOrderId = findDto.saleOrderId;
        this.saleOrderCode = findDto.saleOrderCode;
        this.startDate = findDto.startDate;
        this.endDate = findDto.endDate;
        this.deliveryDate = findDto.deliveryDate;
        this.warehouseids = findDto.warehouseids;
        this.clientid = findDto.clientid;
        this.clientname = findDto.clientname;
        this.ymrep = findDto.ymrep;
        this.saleOrderState = findDto.saleOrderState;
        this.deposit = findDto.deposit;
        this.moneytype = findDto.moneytype;
        this.relatednumber = findDto.relatednumber;
        this.stopReview = findDto.stopReview;
        this.manualFinishReview = findDto.manualFinishReview;
        this.urgentReview = findDto.urgentReview;
        this.level1Review = findDto.level1Review;
        this.level2Review = findDto.level2Review;
        this.remark1 = findDto.remark1;
        this.remark2 = findDto.remark2;
        this.remark3 = findDto.remark3;
        this.remark4 = findDto.remark4;
        this.remark5 = findDto.remark5;
        this.salesman = findDto.salesman;
        this.productId = findDto.productId;
        this.productCode = findDto.productCode;
        this.productName = findDto.productName;
        this.lineClose = findDto.lineClose;
        return this
    }

    public saleOutboundFindSaleOrder(){
        this.lineClose = 0;
        this.level1Review = 1;
        this.level2Review = 1;
        this.stopReview = 0;
        return this
    }
}
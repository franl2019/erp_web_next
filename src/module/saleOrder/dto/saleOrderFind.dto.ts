import {IsArray, IsDateString, IsInt, IsNumber, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetNullDate, useGetStartDate} from "@/utils";
import {IsDateStringOrNull} from "@/utils/verifyParam/customValidationDecorators/IsDateStringOrNull";

export class SaleOrderFindDto {
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
    stopReview:number = 0;
    @IsInt()
    manualFinishReview:number = 0;
    @IsInt()
    urgentReview:number = 0;
    @IsInt()
    level1Review:number = 0;
    @IsInt()
    level2Review:number = 0;
}
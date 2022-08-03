import {IsArray, IsDateString, IsInt, IsString} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class BuyInboundProductSummaryReportFindDto {
    @IsDateString()
    startDate:string = getStartDate();

    @IsDateString()
    endDate:string = getEndDate()

    @IsInt()
    buyid:number = 0;
    buyname:string = ""

    @IsInt()
    productid:number = 0;

    @IsString()
    productcode:string = "";

    @IsString()
    productname:string = "";

    @IsString()
    spec:string = ""

    @IsString()
    unit:string = ""

    @IsString()
    materials:string = ""

    @IsString()
    spec_d:string = ""

    @IsString()
    materials_d:string = ""

    @IsString()
    remark:string = ""

    @IsString()
    remarkmx:string = ""

    @IsArray()
    warehouseids: number[] = [];

    @IsArray()
    operateareaids: number[] = [];
}
import {IsArray, IsInt, IsString ,IsDateString} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class SaleOutboundClientProductSummaryReportFindDto {

    @IsInt()
    clientid:number = 0;

    @IsString()
    clientcode:string = "";

    @IsString()
    clientname:string = ""

    @IsInt()
    productid:number = 0;

    @IsString()
    productcode:string = "";

    @IsString()
    productname:string = "";

    @IsDateString()
    startDate:string = getStartDate();

    @IsDateString()
    endDate:string = getEndDate();

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
import {IsArray, IsDateString, IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export class SaleOutboundProductSummaryReportFindDto {
    @IsInt()
    productid:number = 0;

    @IsString()
    productcode:string = "";

    @IsString()
    productname:string = "";

    @IsDateString()
    startDate:string = useGetStartDate();

    @IsDateString()
    endDate:string = useGetEndDate();

    @IsString()
    unit:string = ""

    @IsString()
    spec:string = ""

    @IsString()
    materials:string = ""

    @IsString()
    spec_d:string = ""

    @IsString()
    materials_d:string =""

    @IsString()
    remark:string =""

    @IsString()
    remarkmx:string =""

    @IsArray()
    warehouseids: number[] = [];

    @IsArray()
    operateareaids: number[] = [];
}
import {IsArray, IsDateString, IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {getEndDate, getStartDate} from "@/utils";

export class SaleGrossMarginSumFindDto {
    @IsDateString()
    startDate:string = getStartDate();

    @IsDateString()
    endDate:string = getEndDate();

    @IsInt()
    clientid:number = 0
    clientname:string = ""



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
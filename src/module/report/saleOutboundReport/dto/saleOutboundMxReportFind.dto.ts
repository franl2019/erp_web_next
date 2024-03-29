import {IsArray, IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export interface IFindSaleOutboundDto {
    warehouseids: number[];
    operateareaids: number[];
    clientid: number;
    startDate: string;
    endDate: string;
    outboundid: number;
    outboundcode: string;
    outboundtype: number;
    relatednumber: string;
    page: number;
    pagesize: number;
}

export class SaleOutboundMxReportFindDto implements IFindSaleOutboundDto{
    @IsInt()
    clientid: number = 0;
    @IsArray()
    operateareaids: number[] = [];
    @IsArray()
    warehouseids: number[] = [];
    @IsString()
    outboundcode: string = "";
    @IsInt()
    outboundid: number = 0;
    @IsInt()
    outboundtype: number = 0;
    @IsInt()
    page: number = 0;
    @IsInt()
    pagesize: number = 0;
    @IsString()
    relatednumber: string = "";
    @IsString()
    startDate: string = useGetStartDate();
    @IsString()
    endDate: string = useGetEndDate();
}
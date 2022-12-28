import {useGetEndDate, useGetStartDate} from "@/utils";
import {IsArray, IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";

export interface ISaleOutboundFindDataDto {
    warehouseids: number[];
    operateareaids: number[];
    clientid: number;
    startDate: string;
    endDate: string;
    outboundid: number;
    outboundcode: string;
    outboundtype: number;
    relatednumber: string;
    ymrep: string;
    page: number;
    pagesize: number;
    clientname: string;
    moneytype: string;
    remark1: string;
    remark2: string
    remark3: string;
    remark4: string;
    remark5: string;
}

export class SaleOutboundFindDataDto implements ISaleOutboundFindDataDto {
    @IsArray()
    warehouseids: number[] = [];
    @IsArray()
    operateareaids: number[] = [];
    @IsInt()
    clientid: number = 0;
    startDate: string = useGetStartDate();
    endDate: string = useGetEndDate();
    @IsInt()
    outboundid: number = 0;
    @IsString()
    outboundcode: string = "";
    outboundtype: number = 8;
    relatednumber: string = "";
    page: number = 0;
    pagesize: number = 0;
    @IsString()
    ymrep: string = "";

    @IsString()
    clientname: string = "";
    @IsString()
    moneytype: string = "";
    @IsString()
    remark1: string = "";
    @IsString()
    remark2: string = "";
    @IsString()
    remark3: string = "";
    @IsString()
    remark4: string = "";
    @IsString()
    remark5: string = "";
}
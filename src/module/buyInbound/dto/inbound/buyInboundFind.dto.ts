import {useGetEndDate, useGetStartDate} from "@/utils";
import {IsArray, IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";

export interface IBuyInboundFindDto {
    warehouseids: number[];
    operateareaids: number[];
    clientid: number;
    startDate: string;
    endDate: string;
    inboundid: number;
    inboundcode: string;
    inboundtype: number;
    relatednumber: string;
    page: number;
    pagesize: number;
    buyname: string;
    moneytype: string;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
}

export class BuyInboundFindDto implements IBuyInboundFindDto {
    @IsArray()
    warehouseids: number[] = [];
    @IsInt()
    inboundid: number = 0;
    @IsString()
    search: string = "";
    @IsInt()
    page: number = 0;
    @IsInt()
    pagesize: number = 0;
    @IsString()
    startDate: string = useGetStartDate();
    @IsString()
    endDate: string = useGetEndDate();
    clientid: number = 0;
    @IsString()
    inboundcode: string = "";
    @IsInt()
    inboundtype: number = 1;
    @IsArray()
    operateareaids: number[] = [];
    @IsString()
    relatednumber: string = "";

    @IsString()
    buyname: string = "";
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
import {getEndDate, getStartDate} from "@/utils";
import {IsString} from "class-validator";

export interface IFindOutboundDto {
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

export class FindOutboundSaleDto implements IFindOutboundDto {
    warehouseids: number[] = [];
    operateareaids: number[] = [];
    clientid: number = 0;
    startDate: string = getStartDate();
    endDate: string = getEndDate();
    outboundid: number = 0;
    outboundcode: string = "";
    outboundtype: number = 8;
    relatednumber: string = "";
    page: number = 0;
    pagesize: number = 0;
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
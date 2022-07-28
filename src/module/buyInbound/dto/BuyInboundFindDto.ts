import {IBuyInboundFindDto} from "@/module/buyInbound/types/IBuyInboundService";
import {getEndDate, getStartDate} from "@/utils";
import {IsArray, IsInt, IsString} from "class-validator";

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
    startDate: string = getStartDate();
    @IsString()
    endDate: string = getEndDate();
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
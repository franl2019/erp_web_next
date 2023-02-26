import {useGetEndDate, useGetStartDate} from "@/utils";
import {IsArray, IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {CodeType} from "@/types/CodeType";
import {IsDateStringOrNull} from "@/utils/verifyParam/customValidationDecorators/IsDateStringOrNull";

export interface ISaleOutboundFindDto {
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

export class SaleOutboundFindDto implements ISaleOutboundFindDto {
    @IsArray()
    warehouseids: number[] = [];
    @IsArray()
    operateareaids: number[] = [];
    @IsInt()
    clientid: number = 0;
    @IsDateStringOrNull()
    startDate: string = useGetStartDate();
    @IsDateStringOrNull()
    endDate: string = useGetEndDate();
    @IsInt()
    outboundid: number = 0;
    @IsString()
    outboundcode: string = "";
    outboundtype: number = CodeType.XS;
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

    public clearQueryDateRange(){
        this.startDate = "";
        this.endDate = "";
        return this
    }
}
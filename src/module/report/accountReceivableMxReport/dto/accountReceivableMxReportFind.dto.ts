import {IsInt, IsString} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class AccountReceivableMxReportFindDto {
    @IsInt()
    clientid:number = 0;
    clientname:string = '';
    @IsString()
    startDate:string = getStartDate();
    @IsString()
    endDate:string = getEndDate();
}
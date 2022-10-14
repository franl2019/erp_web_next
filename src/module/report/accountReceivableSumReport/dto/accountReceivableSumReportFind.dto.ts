import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {getEndDate, getStartDate} from "@/utils";

export class AccountReceivableSumReportFindDto {
    @IsInt()
    clientid:number = 0;
    clientname:string = '';
    @IsString()
    startDate:string = getStartDate();
    @IsString()
    endDate:string = getEndDate();
}
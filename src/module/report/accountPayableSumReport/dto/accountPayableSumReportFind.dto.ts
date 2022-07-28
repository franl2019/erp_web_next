import {IsInt} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class AccountPayableSumReportFindDto {
    @IsInt()
    buyid:number = 0
    buyname:string = ''

    startDate:string = getStartDate();
    endDate:string = getEndDate();
}
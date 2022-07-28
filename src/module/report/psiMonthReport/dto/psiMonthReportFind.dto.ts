import {IsString} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class PsiMonthReportFindDto {
    @IsString()
    startDate:string = getStartDate();
    @IsString()
    endDate:string = getEndDate();
}
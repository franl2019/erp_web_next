import {IsString} from "@/utils/verifyParam/customValidationDecorators";
import {getEndDate, getStartDate} from "@/utils";

export class PsiMonthReportFindDto {
    @IsString()
    startDate:string = getStartDate();
    @IsString()
    endDate:string = getEndDate();
}
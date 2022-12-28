import {IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export class PsiMonthReportFindDto {
    @IsString()
    startDate:string = useGetStartDate();
    @IsString()
    endDate:string = useGetEndDate();
}
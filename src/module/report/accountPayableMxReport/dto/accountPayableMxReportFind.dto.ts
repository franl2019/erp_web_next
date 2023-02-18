import {IsInt} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export class AccountPayableMxReportFindDto {
    @IsInt()
    buyid:number = 0
    buyname:string = ''

    startDate:string = useGetStartDate();
    endDate:string = useGetEndDate();
}
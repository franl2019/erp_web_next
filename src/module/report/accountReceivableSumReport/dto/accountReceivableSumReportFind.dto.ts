import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export class AccountReceivableSumReportFindDto {
    @IsInt()
    clientid:number = 0;
    clientname:string = '';
    @IsString()
    startDate:string = useGetStartDate();
    @IsString()
    endDate:string = useGetEndDate();
}
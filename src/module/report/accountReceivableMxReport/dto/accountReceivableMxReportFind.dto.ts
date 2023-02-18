import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export class AccountReceivableMxReportFindDto {
    @IsInt()
    clientid:number = 0;
    clientname:string = '';
    @IsString()
    startDate:string = useGetStartDate();
    @IsString()
    endDate:string = useGetEndDate();
}
import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export class AccountExpenditureFindDto {
    @IsInt()
    accountExpenditureId: number = 0;
    @IsString()
    accountExpenditureCode: string = '';
    @IsInt()
    accountExpenditureType: number = 0;
    @IsString()
    startDate: string = useGetStartDate();
    @IsString()
    endDate: string = useGetEndDate();
    @IsInt()
    buyid: number = 0;
    @IsInt()
    page: number = 0;
    @IsInt()
    pagesize: number = 0;
}
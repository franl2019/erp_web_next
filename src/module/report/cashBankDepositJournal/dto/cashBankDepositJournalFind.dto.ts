import {IsInt} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

export class CashBankDepositJournalFindDto{
    @IsInt()
    accountId:number = 0;
    startDate:string = useGetStartDate();
    endDate:string = useGetEndDate();
}
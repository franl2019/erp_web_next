import {IsInt} from "@/utils/verifyParam/customValidationDecorators";
import {getEndDate, getStartDate} from "@/utils";

export class CashBankDepositJournalFindDto{
    @IsInt()
    accountId:number = 0;
    startDate:string = getStartDate();
    endDate:string = getEndDate();
}
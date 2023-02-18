import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class AccountExpenditureAmountMxFindDto{
    @IsInt()
    accountExpenditureId: number = 0;
}
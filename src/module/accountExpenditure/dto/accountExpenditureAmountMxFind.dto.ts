import {IsInt} from "class-validator";

export class AccountExpenditureAmountMxFindDto{
    @IsInt()
    accountExpenditureId: number = 0;
}
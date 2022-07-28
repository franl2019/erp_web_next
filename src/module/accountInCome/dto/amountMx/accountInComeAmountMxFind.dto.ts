import {IsInt} from "class-validator";


export class AccountInComeAmountMxFindDto {
    @IsInt()
    accountInComeId: number = 0;
}
import {IsInt} from "class-validator";

export class AccountInComeSheetMxFindDto {
    @IsInt()
    accountInComeId: number = 0;
}
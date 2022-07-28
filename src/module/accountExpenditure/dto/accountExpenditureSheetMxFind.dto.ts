import {IsInt} from "class-validator";

export class AccountExpenditureSheetMxFindDto {
    @IsInt()
    accountExpenditureId:number = 0;
}
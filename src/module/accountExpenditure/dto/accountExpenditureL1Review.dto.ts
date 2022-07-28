import {IsInt} from "class-validator";

export class AccountExpenditureL1ReviewDto {
    @IsInt()
    accountExpenditureId:number = 0;
}
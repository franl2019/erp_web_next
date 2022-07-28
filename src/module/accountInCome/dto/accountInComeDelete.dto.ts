import {IsInt} from "class-validator";

export class AccountInComeDeleteDto {
    @IsInt()
    accountInComeId: number = 0;
}
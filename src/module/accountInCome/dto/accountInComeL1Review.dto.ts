import {IsInt} from "class-validator";

export class AccountInComeL1ReviewDto {
    @IsInt()
    accountInComeId: number = 0;
}
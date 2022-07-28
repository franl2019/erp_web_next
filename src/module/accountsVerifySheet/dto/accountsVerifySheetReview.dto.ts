import {IsInt, NotEquals} from "class-validator";

export class AccountsVerifySheetReviewDto {
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetId: number = 0;
}
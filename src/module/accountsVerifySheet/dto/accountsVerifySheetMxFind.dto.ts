import {IsInt, NotEquals} from "class-validator";

export class AccountsVerifySheetMxFindDto {
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetId: number = 0;
}
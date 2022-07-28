import {IsInt, NotEquals} from "class-validator";

export class AccountsVerifySheetDeleteDto {
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetId: number = 0;
}
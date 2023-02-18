import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class AccountsVerifySheetMxFindDto {
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetId: number = 0;
}
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class AccountsVerifySheetDeleteDto {
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetId: number = 0;
}
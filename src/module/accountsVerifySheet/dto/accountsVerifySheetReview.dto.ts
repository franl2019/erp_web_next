import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class AccountsVerifySheetReviewDto {
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetId: number = 0;
}
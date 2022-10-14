import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class AccountInComeSheetMxFindDto {
    @IsInt()
    accountInComeId: number = 0;
}
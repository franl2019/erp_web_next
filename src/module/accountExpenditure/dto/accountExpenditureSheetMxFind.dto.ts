import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class AccountExpenditureSheetMxFindDto {
    @IsInt()
    accountExpenditureId:number = 0;
}
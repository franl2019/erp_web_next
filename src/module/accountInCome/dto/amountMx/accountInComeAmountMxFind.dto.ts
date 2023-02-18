import {IsInt} from "@/utils/verifyParam/customValidationDecorators";


export class AccountInComeAmountMxFindDto {
    @IsInt()
    accountInComeId: number = 0;
}
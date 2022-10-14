import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class AccountInComeDeleteDto {
    @IsInt()
    accountInComeId: number = 0;
}
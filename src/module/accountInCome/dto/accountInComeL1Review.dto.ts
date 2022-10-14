import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class AccountInComeL1ReviewDto {
    @IsInt()
    accountInComeId: number = 0;
}
import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class AccountExpenditureL1ReviewDto {
    @IsInt()
    accountExpenditureId:number = 0;
}
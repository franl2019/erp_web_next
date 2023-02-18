import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class AccountExpenditureDeleteDto {
    @IsInt()
    accountExpenditureId:number = 0;
}
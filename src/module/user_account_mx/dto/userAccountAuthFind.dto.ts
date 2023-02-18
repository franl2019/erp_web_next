import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class UserAccountAuthFindDto {
    @IsInt()
    userid:number = 0;
    @IsInt()
    accountId:number = 0;
}
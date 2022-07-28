import {IsInt} from "class-validator";

export class UserAccountAuthFindDto {
    @IsInt()
    userid:number = 0;
    @IsInt()
    accountId:number = 0;
}
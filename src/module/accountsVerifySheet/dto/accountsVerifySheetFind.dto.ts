import {IsInt, IsString} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class AccountsVerifySheetFindDto {
    @IsInt()
    accountsVerifySheetId: number = 0;
    @IsString()
    accountsVerifySheetCode: string = "";
    @IsInt()
    sheetType: number = 0;
    @IsInt()
    clientid: number = 0;
    @IsInt()
    clientid_b: number = 0;
    @IsInt()
    buyid: number = 0;
    @IsInt()
    buyid_b: number = 0;
    @IsInt()
    level1Review: number = 0;
    @IsInt()
    level2Review: number = 0;
    @IsString()
    startDate:string = getStartDate();
    @IsString()
    endDate:string = getEndDate();
    @IsInt()
    page:number = 0;
    @IsInt()
    pagesize:number = 0;
}
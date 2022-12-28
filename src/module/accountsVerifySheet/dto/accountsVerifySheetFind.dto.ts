import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

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
    startDate:string = useGetStartDate();
    @IsString()
    endDate:string = useGetEndDate();
    @IsInt()
    page:number = 0;
    @IsInt()
    pagesize:number = 0;
}
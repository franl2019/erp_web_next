import {IsArray, IsInt, IsNumber, IsString, NotEquals} from "class-validator";
import {AccountCategoryType} from "@/types/AccountCategoryType";

export class AccountsPayableFindDto {
    @IsInt()
    accountsPayableId: number = 0;
    @IsArray()
    accountsPayableTypeList:AccountCategoryType[] = [];
    @IsInt()
    @NotEquals(0)
    buyid: number = 0;

    @IsInt()
    correlationId: number = 0;
    @IsInt()
    correlationType: number = 0;
    @IsString()
    correlationCode:string = "";

    @IsNumber()
    amounts:number = 0;
    @IsNumber()
    checkedAmounts:number = 0;
    @IsNumber()
    notCheckAmounts:number = 0;


    @IsString()
    startDate: string = "";
    @IsString()
    endDate: string = "";
    @IsInt()
    page: number = 0;
    @IsInt()
    pagesize: number = 0;
}
import {IsArray, IsInt, IsNumber, IsString} from "class-validator";
import {AccountCategoryType} from "@/types/AccountCategoryType";

export class AccountsReceivableFindDto {
    @IsInt()
    accountsReceivableId:number;
    @IsArray()
    accountsReceivableTypeList:AccountCategoryType[];
    @IsInt()
    clientid:number;

    @IsInt()
    correlationId: number;
    @IsInt()
    correlationType: number;
    @IsString()
    correlationCode: string;

    @IsNumber()
    amounts:number;
    @IsNumber()
    checkedAmounts:number;
    @IsNumber()
    notCheckAmounts:number;


    @IsString()
    startDate:string;
    @IsString()
    endDate:string;
    @IsInt()
    page: number;
    @IsInt()
    pagesize: number;


    constructor(accountsReceivableFindDto:AccountsReceivableFindDto) {
        this.accountsReceivableId = accountsReceivableFindDto.accountsReceivableId;
        this.accountsReceivableTypeList = accountsReceivableFindDto.accountsReceivableTypeList;
        this.clientid = accountsReceivableFindDto.clientid;
        this.correlationId = accountsReceivableFindDto.correlationId;
        this.correlationType = accountsReceivableFindDto.correlationType;
        this.correlationCode = accountsReceivableFindDto.correlationCode;
        this.amounts = accountsReceivableFindDto.amounts;
        this.checkedAmounts = accountsReceivableFindDto.checkedAmounts;
        this.notCheckAmounts = accountsReceivableFindDto.notCheckAmounts;
        this.startDate = accountsReceivableFindDto.startDate;
        this.endDate = accountsReceivableFindDto.endDate;
        this.page = accountsReceivableFindDto.page;
        this.pagesize = accountsReceivableFindDto.pagesize;
    }
}
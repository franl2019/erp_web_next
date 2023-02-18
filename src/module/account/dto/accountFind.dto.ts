export interface IFindAccountDto {
    accountId:number;
    currencyid:number;
    accountCode:string;
    accountName:string;
    accountType:string;
    companyFlag:number;
    useFlag:number;
}

export class FindAccountDto implements IFindAccountDto{
    accountId:number = 0;
    currencyid:number = 0;
    accountCode:string = "";
    accountName:string = "";
    accountType:string = "";
    companyFlag:number = 0;
    useFlag:number = 0;
}
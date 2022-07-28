import {IAccount} from "@/module/account/account";

export class AccountCreateDto implements IAccount {
    accountCode: string = "";
    accountId: number = 0;
    accountName: string = "";
    accountType: string = "";
    companyFlag: number = 0;
    currencyid: number = 0;
    useFlag: number = 0;
    createdAt: Date | null = null;
    creater: string = "";
    updatedAt: Date | null = null;
    updater: string = "";
}
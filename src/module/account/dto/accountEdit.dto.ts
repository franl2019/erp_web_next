import {IAccount} from "@/module/account/account";

export class AccountEditDto implements IAccount {
    accountCode: string;
    accountId: number;
    accountName: string;
    accountType: string;
    companyFlag: number;
    currencyid: number;
    useFlag: number;
    createdAt: Date | null;
    creater: string;
    updatedAt: Date | null;
    updater: string;


    constructor(account: IAccount) {
        this.accountCode = account.accountCode;
        this.accountId = account.accountId;
        this.accountName = account.accountName;
        this.accountType = account.accountType;
        this.companyFlag = account.companyFlag;
        this.currencyid = account.currencyid;
        this.useFlag = account.useFlag;
        this.createdAt = account.createdAt;
        this.creater = account.creater;
        this.updatedAt = account.updatedAt;
        this.updater = account.updater;
    }
}
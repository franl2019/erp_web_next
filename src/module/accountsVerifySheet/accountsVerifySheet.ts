import {IAccountsVerifySheetMx} from "@/module/accountsVerifySheet/accountsVerifySheetMx";

export enum AccountsVerifySheetType {
    /*
    * [1]预收冲应收
    * [2]预付冲应付
    * [3]应收冲应付
    * [4]应收转应收
    * [5]应付转应付
    * */
    advancePayment_accountsReceivable_1 = 1,
    prepayments_accountsPayable_2 = 2,
    accountsReceivable_accountsPayable_3 = 3,
    accountsReceivable_accountsReceivable_4 = 4,
    accountsPayable_accountsPayable_5 = 5,
}

export interface IAccountsVerifySheet {
    accountsVerifySheetId: number;
    accountsVerifySheetCode: string;
    sheetType: AccountsVerifySheetType;
    inDate: string;
    clientid: number;
    clientid_b: number;
    buyid: number;
    buyid_b: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    level1Review: number;
    level1Name: string;
    level1Date: Date | null;
    level2Review: number;
    level2Name: string;
    level2Date: Date | null;
    del_uuid: number;
    deleter: string;
    deleteAt: Date | null;
    reMark1:string;
    reMark2:string;
    reMark3:string;
}

export interface IAccountsVerifySheetFind extends IAccountsVerifySheet {
    clientname:string;
    clientname_b:string;
    buyname:string;
    buyname_b:string;
}

export interface IAccountsVerifySheetAndMx extends IAccountsVerifySheetFind{
    accountsVerifySheetMx:IAccountsVerifySheetMx[]
}
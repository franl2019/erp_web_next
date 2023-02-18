import {AccountCategoryType} from "@/types/AccountCategoryType";

export interface IAccountsVerifySheetMx {
    //账款核销明细Id
    accountsVerifySheetMxId: number;
    //账款核销Id
    accountsVerifySheetId: number;
    //单据金额 10  单据金额>=已核销金额+冲尾数金额+本次核销金额  未核销金额>=冲尾数金额+本次核销金额
    amounts: number;
    //已核销金额 5
    amountsVerified: number;
    //未核销金额 5
    amountsNotVerify: number;
    //冲尾数金额 1
    amountsMantissa: number;
    //本次核销金额 4
    amountsThisVerify: number;
    //账款Id
    correlationId: number;
    //账款类别
    correlationType:AccountCategoryType;
    //明细顺序
    printId:number;
}

export interface IAccountsVerifySheetMxFind extends IAccountsVerifySheetMx{
    correlationCode:string;
}
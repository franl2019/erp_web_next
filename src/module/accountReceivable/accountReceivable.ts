import {AccountCategoryType} from "@/types/AccountCategoryType";
import {CodeType} from "@/types/CodeType";

export interface IAccountsReceivable {
    accountsReceivableId: number;
    //账款类型
    accountsReceivableType: AccountCategoryType;
    clientid: number;
    inDate: string;
    //单据金额
    amounts: number;
    //已核销金额
    checkedAmounts: number;
    //未核销金额
    notCheckAmounts: number;
    //相关单号id
    correlationId: number;
    //相关单号类别
    correlationType: CodeType;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deleter: string;
    deletedAt: Date | null;
}

export interface IAccountsReceivableFind extends IAccountsReceivable {
    clientname: string;
    correlationCode:string
}
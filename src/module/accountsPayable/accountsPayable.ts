import {AccountCategoryType} from "@/types/AccountCategoryType";
import {CodeType} from "@/types/CodeType";

export interface IAccountsPayable {
    accountsPayableId: number;
    accountsPayableType: AccountCategoryType,
    buyid: number;
    inDate: string;
    //单据金额
    amounts: number;
    //已核销金额
    checkedAmounts: number;
    //未核销金额
    notCheckAmounts: number;
    //相关单号
    correlationId: number;
    //相关单号类型
    correlationType: CodeType;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deleter: string;
    deletedAt: Date | null;
}

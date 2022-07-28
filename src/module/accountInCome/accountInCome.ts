import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";

export interface IAccountInCome {
    accountInComeId: number;
    accountInComeCode: string;
    //客户
    clientid: number;
    //发生日期
    indate: string;
    //收款单类型
    accountInComeType:number;
    //总金额
    amount: number;
    reMark: string;
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
    deletedAt: Date | null;
}

export interface IAccountInComeFind extends IAccountInCome {
    clientname: string;
}

export interface IAccountInComeCreateDto extends IAccountInComeFind{
    accountInComeAmountMx:IAccountInComeAmountMx[]
    accountInComeSheetMx:IAccountInComeSheetMxFind[]
}
import {IAccountExpenditure} from "@/module/accountExpenditure/accountExpenditure";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";

export interface IAccountExpenditureCreate extends IAccountExpenditure{
    buyname:string;
    accountExpenditureAmountMx:IAccountExpenditureAmountMx[]
    accountExpenditureSheetMx:IAccountExpenditureSheetMx[]
}
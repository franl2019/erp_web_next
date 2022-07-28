import {IsArray, IsInt, IsNumber, IsString} from "class-validator";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {IAccountExpenditureCreate} from "@/module/accountExpenditure/types/IAccountExpenditureCreate";
import {getToday} from "@/utils";

export class AccountExpenditureCreateDto implements IAccountExpenditureCreate {
    accountExpenditureId: number = 0;
    @IsString()
    accountExpenditureCode: string = "";
    //供应商
    @IsInt()
    buyid: number = 0;
    //发生日期
    indate: string = getToday();
    //付款单类型
    @IsInt()
    accountExpenditureType: number = 0;
    //总金额
    @IsNumber()
    amount: number = 0;
    @IsString()
    reMark: string = "";
    creater: string = "";
    createdAt: Date = new Date();
    updater: string = "";
    updatedAt: Date | null = null;
    level1Review: number = 0;
    level1Name: string = "";
    level1Date: Date | null = null;
    level2Review: number = 0;
    level2Name: string = "";
    level2Date: Date | null = null;
    del_uuid: number = 0;
    deleter: string = "";
    deletedAt: Date | null = null;
    @IsArray()
    accountExpenditureAmountMx: IAccountExpenditureAmountMx[] = []
    @IsArray()
    accountExpenditureSheetMx: IAccountExpenditureSheetMx[] = []
    buyname: string = "";
}
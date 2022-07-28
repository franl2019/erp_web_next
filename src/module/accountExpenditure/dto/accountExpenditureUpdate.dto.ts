import {IsArray, IsInt, IsNumber, IsString} from "class-validator";
import {IAccountExpenditureCreate} from "@/module/accountExpenditure/types/IAccountExpenditureCreate";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {IAccountExpenditure} from "@/module/accountExpenditure/accountExpenditure";
import {getToday} from "@/utils";

export class AccountExpenditureUpdateDto implements IAccountExpenditureCreate {
    @IsInt()
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


    constructor(accountExpenditure: IAccountExpenditure) {
        this.accountExpenditureId = accountExpenditure.accountExpenditureId;
        this.accountExpenditureCode = accountExpenditure.accountExpenditureCode;
        this.buyid = accountExpenditure.buyid;
        this.indate = accountExpenditure.indate;
        this.accountExpenditureType = accountExpenditure.accountExpenditureType;
        this.amount = accountExpenditure.amount;
        this.reMark = accountExpenditure.reMark;
        this.creater = accountExpenditure.creater;
        this.createdAt = accountExpenditure.createdAt;
        this.updater = accountExpenditure.updater;
        this.updatedAt = accountExpenditure.updatedAt;
        this.level1Review = accountExpenditure.level1Review;
        this.level1Name = accountExpenditure.level1Name;
        this.level1Date = accountExpenditure.level1Date;
        this.level2Review = accountExpenditure.level2Review;
        this.level2Name = accountExpenditure.level2Name;
        this.level2Date = accountExpenditure.level2Date;
        this.del_uuid = accountExpenditure.del_uuid;
        this.deleter = accountExpenditure.deleter;
        this.deletedAt = accountExpenditure.deletedAt;
    }

    buyname: string = "";
}
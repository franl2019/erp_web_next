import {IsArray, IsInt, IsNumber, IsString} from "class-validator";
import {IAccountInComeCreateDto, IAccountInComeFind} from "../accountInCome";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";
import {getToday} from "@/utils";

export class AccountInComeUpdateDto implements IAccountInComeCreateDto {
    accountInComeId: number = 0;
    accountInComeCode: string = "";
    @IsInt()
    accountInComeType: number = 0;
    @IsNumber()
    amount: number = 0;
    @IsInt()
    clientid: number = 0;
    indate: string = getToday();
    @IsString()
    reMark: string = "";
    creater: string = "";
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
    updater: string = "";
    level1Date: Date | null = null;
    level1Name: string = "";
    level1Review: number = 0;
    level2Date: Date | null = null;
    level2Name: string = "";
    level2Review: number = 0;
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";
    @IsArray()
    accountInComeAmountMx: IAccountInComeAmountMx[] = [];
    @IsArray()
    accountInComeSheetMx: IAccountInComeSheetMxFind[] = [];
    clientname: string = "";

    constructor(accountInComeFind:IAccountInComeFind) {
        this.accountInComeId = accountInComeFind.accountInComeId;
        this.accountInComeCode = accountInComeFind.accountInComeCode;
        this.accountInComeType = accountInComeFind.accountInComeType;
        this.amount = accountInComeFind.amount;
        this.clientid = accountInComeFind.clientid;
        this.indate = accountInComeFind.indate;
        this.reMark = accountInComeFind.reMark;
        this.creater = accountInComeFind.creater;
        this.createdAt = accountInComeFind.createdAt;
        this.updatedAt = accountInComeFind.updatedAt;
        this.updater = accountInComeFind.updater;
        this.level1Date = accountInComeFind.level1Date;
        this.level1Name = accountInComeFind.level1Name;
        this.level1Review = accountInComeFind.level1Review;
        this.level2Date = accountInComeFind.level2Date;
        this.level2Name = accountInComeFind.level2Name;
        this.level2Review = accountInComeFind.level2Review;
        this.del_uuid = accountInComeFind.del_uuid;
        this.deletedAt = accountInComeFind.deletedAt;
        this.deleter = accountInComeFind.deleter;
        this.clientname = accountInComeFind.clientname;
    }
}
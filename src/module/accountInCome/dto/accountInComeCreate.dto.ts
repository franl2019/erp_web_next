import {IAccountInComeCreateDto, IAccountInComeFind} from "../accountInCome";
import {IsArray, IsInt, IsNumber, IsString} from "class-validator";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";

export class AccountInComeCreateDto implements IAccountInComeCreateDto {
    accountInComeId: number;
    accountInComeCode: string;
    @IsInt()
    accountInComeType: number;
    @IsNumber()
    amount: number;
    @IsInt()
    clientid: number;
    clientname: string = "";
    indate: string;
    @IsString()
    reMark: string;
    creater: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    updater: string;
    level1Date: Date | null;
    level1Name: string;
    level1Review: number;
    level2Date: Date | null;
    level2Name: string;
    level2Review: number;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
    @IsArray()
    accountInComeAmountMx: IAccountInComeAmountMx[] = [];
    @IsArray()
    accountInComeSheetMx: IAccountInComeSheetMxFind[] = [];

    constructor(accountInComeFind: IAccountInComeFind) {
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
    }

}
import {
    AccountsVerifySheetType,
    IAccountsVerifySheet,
    IAccountsVerifySheetAndMx
} from "@/module/accountsVerifySheet/accountsVerifySheet";
import {IsArray, IsInt, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {IAccountsVerifySheetMx} from "@/module/accountsVerifySheet/accountsVerifySheetMx";


export class AccountsVerifySheetCreateDto implements IAccountsVerifySheetAndMx {
    accountsVerifySheetId: number;
    @IsString()
    accountsVerifySheetCode: string;
    @IsInt()
    @NotEquals(0)
    sheetType: AccountsVerifySheetType;
    inDate: string;
    @IsInt()
    clientid: number;
    @IsInt()
    clientid_b: number;
    @IsInt()
    buyid: number;
    @IsInt()
    buyid_b: number;
    del_uuid: number;
    deleteAt: Date | null;
    deleter: string;
    level1Date: Date | null;
    level1Name: string;
    level1Review: number;
    level2Date: Date | null;
    level2Name: string;
    level2Review: number;
    createdAt: Date | null;
    creater: string;
    updatedAt: Date | null;
    updater: string;
    @IsString()
    reMark1:string;
    @IsString()
    reMark2:string;
    @IsString()
    reMark3:string;

    @IsArray()
    accountsVerifySheetMx: IAccountsVerifySheetMx[] = [];


    clientname: string = '';
    clientname_b: string = '';
    buyname: string = '';
    buyname_b: string = '';

    constructor(accountsVerifySheet: IAccountsVerifySheet) {
        this.accountsVerifySheetId = accountsVerifySheet.accountsVerifySheetId;
        this.accountsVerifySheetCode = accountsVerifySheet.accountsVerifySheetCode;
        this.sheetType = accountsVerifySheet.sheetType;
        this.inDate = accountsVerifySheet.inDate;
        this.clientid = accountsVerifySheet.clientid;
        this.clientid_b = accountsVerifySheet.clientid_b;
        this.buyid = accountsVerifySheet.buyid;
        this.buyid_b = accountsVerifySheet.buyid_b;
        this.del_uuid = accountsVerifySheet.del_uuid;
        this.deleteAt = accountsVerifySheet.deleteAt;
        this.deleter = accountsVerifySheet.deleter;
        this.level1Date = accountsVerifySheet.level1Date;
        this.level1Name = accountsVerifySheet.level1Name;
        this.level1Review = accountsVerifySheet.level1Review;
        this.level2Date = accountsVerifySheet.level2Date;
        this.level2Name = accountsVerifySheet.level2Name;
        this.level2Review = accountsVerifySheet.level2Review;
        this.createdAt = accountsVerifySheet.createdAt;
        this.creater = accountsVerifySheet.creater;
        this.updatedAt = accountsVerifySheet.updatedAt;
        this.updater = accountsVerifySheet.updater;
        this.reMark1 = accountsVerifySheet.reMark1;
        this.reMark2 = accountsVerifySheet.reMark2;
        this.reMark3 = accountsVerifySheet.reMark3;
    }
}
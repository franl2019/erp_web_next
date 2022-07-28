import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {IsInt, IsNumber, IsString} from "class-validator";

export class AccountExpenditureAmountMxCreateDto implements IAccountExpenditureAmountMx{
    @IsInt()
    accountExpenditureAmountMxId: number;
    @IsInt()
    accountExpenditureId: number;
    @IsInt()
    printId: number;
    @IsInt()
    accountId: number;
    @IsNumber()
    amount: number;
    @IsString()
    receivingAccount: string;
    @IsString()
    payee: string;
    @IsString()
    reMark1: string;
    @IsString()
    reMark2: string;
    @IsString()
    reMark3: string;


    constructor(accountExpenditureAmountMx:IAccountExpenditureAmountMx) {
        this.accountExpenditureAmountMxId = accountExpenditureAmountMx.accountExpenditureAmountMxId;
        this.accountExpenditureId = accountExpenditureAmountMx.accountExpenditureId;
        this.printId = accountExpenditureAmountMx.printId;
        this.accountId = accountExpenditureAmountMx.accountId;
        this.amount = accountExpenditureAmountMx.amount;
        this.receivingAccount = accountExpenditureAmountMx.receivingAccount;
        this.payee = accountExpenditureAmountMx.payee;
        this.reMark1 = accountExpenditureAmountMx.reMark1;
        this.reMark2 = accountExpenditureAmountMx.reMark2;
        this.reMark3 = accountExpenditureAmountMx.reMark3;
    }
}
import {IsInt, IsNumber, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";

export class AccountInComeAmountMxCreateDto implements IAccountInComeAmountMx {
    //收款单明细Id
    @IsInt()
    accountInComeAmountMxId: number;
    //收款单Id
    @IsInt()
    accountInComeId: number;
    //明细顺序
    @IsInt()
    printId: number;
    //结算方式
    @IsString()
    settlementMethod: string;
    //出纳账户
    @IsInt()
    accountId: number;
    //出纳收款金额
    @IsNumber()
    amount: number;
    //币种Id
    @IsInt()
    currencyid: number;
    //汇率
    @IsNumber()
    exchangeRate: number;
    //应收账款金额
    @IsNumber()
    accountsReceivable: number;
    //付款账户
    @IsString()
    paymentAccount: string;
    //付款人
    @IsString()
    payer: string;
    //备注1
    @IsString()
    reMack1: string;
    //备注2
    @IsString()
    reMack2: string;
    //备注3
    @IsString()
    reMack3: string;


    constructor(accountInComeAmountMx: IAccountInComeAmountMx) {
        this.accountInComeAmountMxId = accountInComeAmountMx.accountInComeAmountMxId;
        this.accountInComeId = accountInComeAmountMx.accountInComeId;
        this.printId = accountInComeAmountMx.printId;
        this.settlementMethod = accountInComeAmountMx.settlementMethod;
        this.accountId = accountInComeAmountMx.accountId;
        this.amount = accountInComeAmountMx.amount;
        this.currencyid = accountInComeAmountMx.currencyid;
        this.exchangeRate = accountInComeAmountMx.exchangeRate;
        this.accountsReceivable = accountInComeAmountMx.accountsReceivable;
        this.paymentAccount = accountInComeAmountMx.paymentAccount;
        this.payer = accountInComeAmountMx.payer;
        this.reMack1 = accountInComeAmountMx.reMack1;
        this.reMack2 = accountInComeAmountMx.reMack2;
        this.reMack3 = accountInComeAmountMx.reMack3;
    }
}
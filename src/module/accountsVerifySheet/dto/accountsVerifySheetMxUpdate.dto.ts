import {IsInt, IsNumber, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {IAccountsVerifySheetMx, IAccountsVerifySheetMxFind} from "@/module/accountsVerifySheet/accountsVerifySheetMx";

export class AccountsVerifySheetMxUpdateDto implements IAccountsVerifySheetMxFind {
    //账款核销明细Id
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetMxId: number;
    //账款核销Id
    @IsInt()
    @NotEquals(0)
    accountsVerifySheetId: number;
    //单据金额 10  单据金额>=已核销金额+冲尾数金额+本次核销金额  未核销金额>=冲尾数金额+本次核销金额
    @IsNumber()
    @NotEquals(0)
    amounts: number;
    //已核销金额 5
    @IsNumber()
    amountsVerified: number;
    //未核销金额 5
    @IsNumber()
    @NotEquals(0)
    amountsNotVerify: number;
    //冲尾数金额 1
    @IsNumber()
    amountsMantissa: number;
    //本次核销金额 4
    @IsNumber()
    @NotEquals(0)
    amountsThisVerify: number;
    //账款Id
    @IsInt()
    @NotEquals(0)
    correlationId: number;
    //账款类别
    @IsInt()
    @NotEquals(0)
    correlationType: number;
    correlationCode: string = '';
    @IsInt()
    printId: number;

    constructor(accountsVerifySheetMx: IAccountsVerifySheetMx) {
        this.accountsVerifySheetMxId = accountsVerifySheetMx.accountsVerifySheetMxId;
        this.accountsVerifySheetId = accountsVerifySheetMx.accountsVerifySheetId;
        this.amounts = accountsVerifySheetMx.amounts;
        this.amountsVerified = accountsVerifySheetMx.amountsVerified;
        this.amountsNotVerify = accountsVerifySheetMx.amountsNotVerify;
        this.amountsMantissa = accountsVerifySheetMx.amountsMantissa;
        this.amountsThisVerify = accountsVerifySheetMx.amountsThisVerify;
        this.correlationId = accountsVerifySheetMx.correlationId;
        this.correlationType = accountsVerifySheetMx.correlationType;
        this.printId = accountsVerifySheetMx.printId;
    }
}
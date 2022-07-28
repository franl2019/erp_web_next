//收款单单据明细
export interface IAccountInComeSheetMx {
    //收款单单据明细Id
    accountInComeSheetMxId: number;
    //收款单Id
    accountInComeId: number;
    //明细顺序
    printId: number;
    //单据金额
    amounts: number;
    //已核销金额
    amountsVerified: number;
    //未核销金额
    amountsNotVerify: number;
    //冲尾数金额
    amountsMantissa: number;
    //本次核销金额
    amountsThisVerify: number;
    //相关单据Id
    correlationId: number;
    //相关单据类型
    correlationType: number
}

export interface IAccountInComeSheetMxFind extends IAccountInComeSheetMx{
    correlationCode:string;
}
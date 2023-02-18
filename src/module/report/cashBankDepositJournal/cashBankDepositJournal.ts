export interface IAccountRecord {
    //单据id
    accountRecordId: number;
    //出纳账户id
    accountId: number;
    //发生日期
    indate: Date;
    //期初
    openQty: number;
    //借方
    debitQty: number;
    //贷方
    creditQty: number;
    //期末
    balanceQty: number;
    //备注
    reMark: string;
    //相关号码
    relatedNumber: string;
    creater: string;
    createdAt: Date;
    correlationId: number;
    correlationType: number;
}

export interface ICashBankDepositJournal extends IAccountRecord {
    accountName:string;
    correlationCode:string;
    correlationPeople:string;
}
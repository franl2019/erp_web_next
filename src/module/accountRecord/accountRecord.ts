export interface AccountRecord {
    //单据id
    accountRecordId:number;
    //单据号码
    accountRecordCode:string;
    //出纳账户id
    accountId:number;
    //发生日期
    indate:string;
    //借方
    debitQty:number;
    //贷方
    creditQty:number;
    //余额
    balanceBd:number;
    //备注
    reMark:string;
    //相关号码
    relatedNumber:string;
    creater:string;
    createdAt:Date;
    updater:string;
    updatedAt:Date;
    //审核
    level1Review:number;
    level1Name:string;
    level1Date:Date;
    level2Review:number;
    level2Name:string;
    level2Date:Date;
}
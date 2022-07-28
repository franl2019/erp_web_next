export interface IAccountExpenditure {
    accountExpenditureId: number;
    accountExpenditureCode: string;
    //供应商
    buyid: number;
    //发生日期
    indate: string;
    //付款单类型
    accountExpenditureType:number;
    //总金额
    amount: number;
    reMark: string;
    creater: string;
    createdAt: Date;
    updater: string;
    updatedAt: Date | null;
    level1Review: number;
    level1Name: string;
    level1Date: Date|null;
    level2Review: number;
    level2Name: string;
    level2Date: Date|null;
    del_uuid:number;
    deleter:string
    deletedAt:Date|null;
}

export interface IAccountExpenditureFind extends IAccountExpenditure {
    accountName: string;
    buyname: string;
}
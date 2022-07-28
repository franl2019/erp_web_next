export interface IAccount {
    //出纳账户Id
    accountId: number;
    //币种Id
    currencyid: number;
    //出纳账户编号
    accountCode: string;
    //出纳账户名称
    accountName: string;
    //出纳账户类型
    accountType: string;
    //公户标记
    companyFlag: number;
    //新增人
    creater: string;
    //新增时间
    createdAt: Date | null;
    //更新人
    updater: string;
    //更新时间
    updatedAt: Date | null;
    //使用标记
    useFlag: number;
}


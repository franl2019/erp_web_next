export interface IProductOtherUnit {
    //id
    productOtherUnitId: number;

    //辅助单位名称
    productOtherUnitName: string;

    //辅助单位转换率
    defaultConversionRate: number;

    //使用率
    useflag: number;

    //使用日期
    useflagDate: Date | null;

    creater: string;
    createdAt: Date | null;

    updater: string | null;
    updatedAt: Date | null;

    level1Review: number;
    level1Name: string | null;
    level1Date: Date | null;

    level2Review: number;
    level2Name: string | null;
    level2Date: Date | null;

    del_uuid: number;
    deleter: string | null;
    deletedAt: Date | null;
}
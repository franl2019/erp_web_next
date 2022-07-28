export interface ICurrency {
    currencyid: number;
    currencyname: string;
    standardmoneyflag: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
}
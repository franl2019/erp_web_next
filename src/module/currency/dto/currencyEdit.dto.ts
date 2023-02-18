import {ICurrency} from "@/module/currency/currency";

export class CurrencyEditDto implements ICurrency {
    currencyid: number = 0;
    currencyname: string = "";
    standardmoneyflag: number = 0;
    createdAt: Date | null = null;
    creater: string = "";
    updatedAt: Date | null = null;
    updater: string = "";
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";


    constructor(currency: ICurrency) {
        this.currencyid = currency.currencyid;
        this.currencyname = currency.currencyname;
        this.standardmoneyflag = currency.standardmoneyflag;
        this.createdAt = currency.createdAt;
        this.creater = currency.creater;
        this.updatedAt = currency.updatedAt;
        this.updater = currency.updater;
        this.del_uuid = currency.del_uuid;
        this.deletedAt = currency.deletedAt;
        this.deleter = currency.deleter;
    }
}
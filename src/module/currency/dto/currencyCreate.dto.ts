import {ICurrency} from "@/module/currency/currency";

export class CurrencyCreateDto implements ICurrency{
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
}
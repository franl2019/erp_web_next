import {IOutbound} from "@/module/saleOutbound/outboundSale";

export interface IFindOutbound extends IOutbound{
    clientname: string;
    warehousename: string;
}
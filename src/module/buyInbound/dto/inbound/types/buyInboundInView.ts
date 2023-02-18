import {IInbound} from "@/module/inbound/IInbound";

export interface IBuyInboundInView extends IInbound{
    buyname: string;
    clientname: string;
    warehousename: string;
}
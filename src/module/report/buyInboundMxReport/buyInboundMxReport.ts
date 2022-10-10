import {IInbound} from "@/module/inbound/IInbound";
import {IInboundMx} from "@/module/inboundMx/IInboundMx";

export interface IBuyInboundMxReport extends IInbound,IInboundMx{

    productcode: string;
    productname: string;
    spec: string;
    materials: string;
    unit: string;
    packunit: string;
    packqty: number;
    m3: number;
    length: number;
    width: number;
    height: number;

    clientname:string;
    clientcode:string;

    buyname:string;
    buycode:string;

    warehousename:string;
    warehousecode:string;
}

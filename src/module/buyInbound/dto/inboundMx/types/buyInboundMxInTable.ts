import {IInboundMx} from "@/module/inboundMx/IInboundMx";

export interface IBuyInboundMxInTable extends IInboundMx{
    packqty: number;
    productcode: string;
    productname: string;
    spec: string;
    materials: string;
    unit: string;
    amt: number;
}
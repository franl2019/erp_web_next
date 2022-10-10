import {IInboundMx} from "@/module/inboundMx/IInboundMx";

export interface IBuyInboundMxTableData extends IInboundMx {
    productcode: string;
    productname: string;
    spec: string;
    materials: string;
    unit: string;
    amt: number;
    packqty: number;
    rowId:number;
}
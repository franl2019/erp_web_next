import {IInboundMx} from "@/types/inboundMx/IInboundMx";

export interface IProductionInboundMxTableData extends IInboundMx {
    productcode: string;
    productname: string;
    spec: string;
    materials: string;
    unit: string;
    amt: number;
    packqty: number;
    rowId:number;
}
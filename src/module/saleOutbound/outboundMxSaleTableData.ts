import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";

export interface IOutboundMxTableData extends IOutboundMx {
    warehousename: string;
    clientcode: string;
    clientname: string;
    productcode: string;
    productname: string;
    materials: string;
    spec: string;
    unit: string;
    packunit: string;
    packqty: number;
    m3: number;
    length: number;
    width: number;
    height: number;
    amt:number;
}

export class OutboundMxSaleTableData implements IOutboundMxTableData {
    rowId:number = 0;
    outboundid: number = 0;
    printid: number = 0;
    inventoryid: number = 0;
    productid: number = 0;
    spec_d: string = "";
    materials_d: string = "";
    remarkmx: string = "";
    remark: string = "";
    outqty: number = 0;
    bzqty: number = 0;
    priceqty: number = 0;
    price: number = 0;
    bzprice: number = 0;
    netprice: number = 0;
    floatprice1: number = 0;
    floatprice2: number = 0;
    floatprice3: number = 0;
    agio: number = 1;
    agio1: number = 1;
    agio2: number = 1;
    pricetype: number = 0;
    clientid: number = 0;
    warehouseid: number = 0;
    warehousename: string = "";
    clientcode: string = "";
    clientname: string = "";
    productcode: string = "";
    productname: string = "";
    materials: string = "";
    spec: string = "";
    unit: string = "";
    packunit: string = "";
    packqty: number = 0;
    m3: number = 0;
    length: number = 0;
    width: number = 0;
    height: number = 0;
    amt:number = 0;
}
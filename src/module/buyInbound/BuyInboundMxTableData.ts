import {IBuyInboundMxTableData} from "@/module/buyInbound/types/IBuyInboundMxService";

export class BuyInboundMxTableData implements IBuyInboundMxTableData {
    inboundid: number = 0;
    printid: number = 0;
    clientid: number = 0;
    productid: number = 0;
    spec_d: string = "";
    materials_d: string = "";
    remarkmx: string = "";
    remark: string = "";
    inqty: number = 0;
    bzqty: number = 0;
    packqty: number = 1;
    priceqty: number = 0;
    price: number = 0;
    bzprice: number = 0;
    netprice: number = 0;
    agio: number = 1;
    agio1: number = 1;
    agio2: number = 1;
    pricetype: number = 0;
    productcode: string = "";
    productname: string = "";
    spec: string = "";
    materials: string = "";
    unit: string = "";
    amt: number = 0;
    rowId: number = 0;
}
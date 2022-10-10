//进仓单明细实例接口
export interface IInboundMx {
    inboundid: number;
    //行顺序id
    printid: number;
    clientid: number;
    productid: number;
    spec_d: string;
    materials_d: string;
    remarkmx: string;
    remark: string;
    inqty: number;
    bzqty: number;
    priceqty: number;
    price: number;
    bzprice: number;
    netprice: number;
    agio: number;
    agio1: number;
    agio2: number;
    pricetype: number;
}
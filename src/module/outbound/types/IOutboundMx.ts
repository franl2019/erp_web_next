export interface IOutboundMx {
    outboundid: number;
    printid: number;
    inventoryid: number;
    productid: number;
    spec_d: string;
    materials_d: string;
    remarkmx: string;
    remark: string;
    batchNo:string;
    outqty: number;
    //包装件数
    bzqty: number;
    priceqty: number;
    price: number;
    bzprice: number;
    netprice: number;
    floatprice1: number;
    floatprice2: number;
    floatprice3: number;
    agio: number;
    agio1: number;
    agio2: number;
    pricetype: number;
    clientid: number;
    warehouseid: number;

    otherUnit:string;
    otherUnitConversionRate:number;
    kz_productCode:string;
    kz_productName:string;
    kz_spec:string;
    kz_materials:string;
    kz_remark:string;
    kz_spec_d:string;
    kz_materials_d:string;

    remark1:string;
    remark2:string;
    remark3:string;
    remark4:string;
    remark5:string;
    returnGoodsQty:number;
}
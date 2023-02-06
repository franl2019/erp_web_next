export interface ISaleOrderMx {
    //销售订单头id
    saleOrderId: number;
    //明细顺序
    printid: number;
    //产品id
    productid: number;
    //订做规格
    spec_d: string;
    //现用料
    materials_d: string;
    //批货
    batchNo:string;
    //明细备注
    remarkmx: string;
    //备注
    remark: string;
    //数量
    outqty: number;
    //包装数量
    bzqty: number;
    //终止数量
    stopQty: number;
    //计价数量
    priceqty: number;
    //单价
    price: number;
    //包装单价
    bzprice: number;
    //实价
    netprice: number;
    //浮动价
    floatprice1: number;
    floatprice2: number;
    floatprice3: number;
    //折扣
    agio1: number;
    agio2: number;
    agio3: number;
    //汇率
    exchangeRate: number;
    //税率
    rate: number;
    //含税单价
    ratePrice: number;
    //含税金额
    rateAmount: number;
    //计价类型
    pricetype: number;
    //已开单数
    openQty: number;
    //出货数量
    saleQty: number;
}
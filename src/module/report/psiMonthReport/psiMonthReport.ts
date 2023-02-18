export interface IPsiMonthReport {

    //产品信息
    productid: number;
    productcode: string;
    productname: string;
    spec: string;
    materials: string;
    unit: string;

    //库存信息
    spec_d: string;
    materials_d: string;
    remark:string;
    remarkmx:string;

    //上月加权平均单价
    weightedAveragePrice_lastMonth:number;
    //上月结存数量
    qty_lastMonth:number;
    //上月结存金额
    amount_lastMonth:number;

    //本月加权平均单价
    weightedAveragePrice_thisMonth:number;

    //本月购进数量
    qty_buy_thisMonth:number;
    //本月购进单价
    price_buy_thisMonth:number;
    //本月购进金额
    amount_buy_thisMonth:number;

    //本月成本数量
    qty_saleCost_thisMonth:number;
    //本月成本单价
    price_saleCost_thisMonth:number;
    //本月成本金额
    amount_saleCost_thisMonth:number;

    //本月销售数量
    qty_sale_thisMonth:number;
    //本月销售金额
    amount_sale_thisMonth:number;

    //本月结存数量
    balanceQty_thisMonth:number;
    //本月结存金额
    balanceAmount_thisMonth:number;
}
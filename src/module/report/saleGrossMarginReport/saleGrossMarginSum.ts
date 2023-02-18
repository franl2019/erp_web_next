export interface ISaleGrossMarginSum {
    productcode: string;
    productname: string;
    materials: string;
    spec: string;
    unit: string;
    spec_d: string;
    materials_d: string;
    remarkmx: string;
    remark: string;
    priceqty: number;
    netprice: number
    amt: number;
    //本月加权平均价
    weightedAveragePrice_thisMonth: number;
    //本月销售金额
    amount_saleCost_thisMonth: number

    //毛利
    saleGrossMargin: number;
    //毛利率
    saleGrossMarginRate: number
}
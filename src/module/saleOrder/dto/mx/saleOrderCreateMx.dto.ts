import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";
import {IsInt, IsNumber, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOrderCreateMxDto implements ISaleOrderMx {
    //销售订单头id
    saleOrderId: number;
    //明细顺序
    @IsInt()
    printid: number;
    //产品id
    @IsInt()
    @NotEquals(0)
    productid: number;
    //订做规格
    @IsString()
    spec_d: string;
    //现用料
    @IsString()
    materials_d: string;
    @IsString()
    batchNo: string;
    //明细备注
    @IsString()
    remarkmx: string;
    //备注
    @IsString()
    remark: string;
    //数量
    @IsNumber()
    outqty: number;
    //包装数量
    @IsNumber()
    bzqty: number;
    //计价数量
    priceqty: number;
    //单价
    @IsNumber()
    price: number;
    //包装单价
    @IsNumber()
    bzprice: number;
    //实价
    netprice: number;
    //浮动价
    @IsNumber()
    floatprice1: number;
    @IsNumber()
    floatprice2: number;
    @IsNumber()
    floatprice3: number;
    //折扣
    @IsNumber()
    agio: number;
    @IsNumber()
    agio1: number;
    @IsNumber()
    agio2: number;
    //汇率
    @IsNumber()
    exchangeRate: number;
    //税率
    @IsNumber()
    rate: number;
    //含税单价
    ratePrice: number;
    //含税金额
    rateAmount: number;
    //计价类型
    @IsNumber()
    pricetype: number;
    //终止数量
    stopQty: number;
    //已开单数
    openQty: number;
    //出货数量
    saleQty: number;

    @IsString()
    otherUnit:string;
    @IsNumber()
    otherUnitConversionRate:number;

    @IsString()
    kz_productCode:string;
    @IsString()
    kz_productName:string;
    @IsString()
    kz_spec:string;
    @IsString()
    kz_materials:string;
    @IsString()
    kz_remark:string;
    @IsString()
    kz_spec_d:string;
    @IsString()
    kz_materials_d:string;
    @IsString()
    remark1: string;
    @IsString()
    remark2: string;
    @IsString()
    remark3: string;
    @IsString()
    remark4: string;
    @IsString()
    remark5: string;

    constructor() {
        this.saleOrderId = 0;
        this.printid = 0;
        this.productid = 0;
        this.spec_d = "";
        this.materials_d = "";
        this.remarkmx = ""
        this.remark = ""
        this.batchNo = ""
        this.outqty = 0;
        this.bzqty = 0;
        this.priceqty = 0;
        this.price = 0
        this.bzprice = 0
        this.netprice = 0;
        this.floatprice1 = 0;
        this.floatprice2 = 0;
        this.floatprice3 = 0;
        this.agio = 1;
        this.agio1 = 1;
        this.agio2 = 1;
        this.exchangeRate = 1;
        this.rate = 1;
        this.ratePrice = 0;
        this.rateAmount = 0;
        this.pricetype = 0;
        this.stopQty = 0;
        this.openQty = 0;
        this.saleQty = 0;
        this.otherUnit = "";
        this.otherUnitConversionRate = 1;
        this.kz_productCode = "";
        this.kz_productName = ""
        this.kz_spec = ""
        this.kz_materials = ""
        this.kz_remark = ""
        this.kz_spec_d = ""
        this.kz_materials_d = ""
        this.remark1 = "";
        this.remark2 = "";
        this.remark3 = "";
        this.remark4 = "";
        this.remark5 = "";
    }



}
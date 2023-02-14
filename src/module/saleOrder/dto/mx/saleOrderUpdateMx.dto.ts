import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {SaleOrderCreateMxDto} from "@/module/saleOrder/dto/mx/saleOrderCreateMx.dto";

export class SaleOrderUpdateMxDto extends SaleOrderCreateMxDto{
    //销售订单头id
    @IsInt()
    @NotEquals(0)
    saleOrderId: number = 0;

    constructor(saleOrderMx: ISaleOrderMx) {
        super()
        this.saleOrderId = saleOrderMx.saleOrderId;
        this.printid = saleOrderMx.printid;
        this.productid = saleOrderMx.productid;
        this.spec_d = saleOrderMx.spec_d;
        this.materials_d = saleOrderMx.materials_d;
        this.remarkmx = saleOrderMx.remarkmx;
        this.remark = saleOrderMx.remark;
        this.batchNo = saleOrderMx.batchNo;
        this.outqty = saleOrderMx.outqty;
        this.bzqty = saleOrderMx.bzqty;
        this.priceqty = saleOrderMx.priceqty;
        this.price = saleOrderMx.price;
        this.bzprice = saleOrderMx.bzprice;
        this.netprice = saleOrderMx.netprice;
        this.floatprice1 = saleOrderMx.floatprice1;
        this.floatprice2 = saleOrderMx.floatprice2;
        this.floatprice3 = saleOrderMx.floatprice3;
        this.agio = saleOrderMx.agio;
        this.agio1 = saleOrderMx.agio1;
        this.agio2 = saleOrderMx.agio2;
        this.exchangeRate = saleOrderMx.exchangeRate;
        this.rate = saleOrderMx.rate;
        this.ratePrice = saleOrderMx.ratePrice;
        this.rateAmount = saleOrderMx.rateAmount;
        this.pricetype = saleOrderMx.pricetype;
        this.stopQty = saleOrderMx.stopQty;
        this.openQty = saleOrderMx.openQty;
        this.saleQty = saleOrderMx.saleQty;
    }
}
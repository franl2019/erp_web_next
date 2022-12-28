import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IsInt, IsNumber, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOutboundMxCreateDto implements IOutboundMx {
    @IsNumber()
    @NotEquals(0)
    //折扣
    agio: number;
    @IsNumber()
    @NotEquals(0)
    //折扣1
    agio1: number;
    @IsNumber()
    @NotEquals(0)
    //折扣2
    agio2: number;
    @IsNumber()
    //包件价格
    bzprice: number;
    @IsNumber()
    @NotEquals(0)
    //包装件数
    bzqty: number;
    @IsNumber()
    @NotEquals(0)
    //客户id
    clientid: number;
    @IsNumber()
    //浮动价
    floatprice1: number;
    @IsNumber()
    floatprice2: number;
    @IsNumber()
    floatprice3: number;
    @IsString()
    //现用料
    materials_d: string;
    @IsNumber()
    //实价
    netprice: number;
    @IsNumber()
    @NotEquals(0)
    //出仓数量
    outqty: number;
    @IsNumber()
    //单价
    price: number;
    @IsNumber()
    @NotEquals(0)
    //计价数量
    priceqty: number;
    @IsInt()
    //计价方式
    pricetype: number;
    @IsInt()
    printid: number;
    @IsString()
    remark: string;
    @IsString()
    remarkmx: string;
    @IsString()
    spec_d: string;
    @IsString()
    batchNo: string;
    @IsInt()
    @NotEquals(0)
    productid: number;
    @IsInt()
    outboundid: number;
    @IsInt()
    @NotEquals(0)
    inventoryid: number;
    @IsInt()
    @NotEquals(0)
    warehouseid: number;

    @IsString()
    otherUnit: string;
    @IsNumber()
    @NotEquals(0)
    //辅助单位转换率 不能为0
    otherUnitConversionRate: number;
    @IsString()
    kz_productCode: string;
    @IsString()
    kz_productName: string;
    @IsString()
    kz_spec: string;
    @IsString()
    kz_materials: string;
    @IsString()
    kz_remark: string;
    @IsString()
    kz_spec_d: string;
    @IsString()
    kz_materials_d: string;
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
    @IsNumber()
    //退货数量
    returnGoodsQty: number;

    constructor() {
        this.agio = 1;
        this.agio1 = 1;
        this.agio2 = 1;
        this.bzprice = 0;
        this.bzqty = 0;
        this.clientid = 0;
        this.floatprice1 = 0;
        this.floatprice2 = 0;
        this.floatprice3 = 0;
        this.materials_d = "";
        this.netprice = 0;
        this.outqty = 0;
        this.price = 0;
        this.priceqty = 0;
        this.pricetype = 0;
        this.printid = 0;
        this.remark = "";
        this.remarkmx = "";
        this.spec_d = "";
        this.batchNo = "";
        this.productid = 0;
        this.outboundid = 0;
        this.inventoryid = 0;
        this.warehouseid = 0;
        this.otherUnit = "";
        this.otherUnitConversionRate = 1;
        this.kz_productCode = "";
        this.kz_productName = "";
        this.kz_spec = "";
        this.kz_materials = "";
        this.kz_remark = "";
        this.kz_spec_d = "";
        this.kz_materials_d = "";
        this.remark1 = "";
        this.remark2 = "";
        this.remark3 = "";
        this.remark4 = "";
        this.remark5 = "";
        this.returnGoodsQty = 0;
    }

    public setMx(outboundMx:IOutboundMx) {
        this.agio = outboundMx.agio;
        this.agio1 = outboundMx.agio1;
        this.agio2 = outboundMx.agio2;
        this.bzprice = outboundMx.bzprice;
        this.bzqty = outboundMx.bzqty;
        this.clientid = outboundMx.clientid;
        this.floatprice1 = outboundMx.floatprice1;
        this.floatprice2 = outboundMx.floatprice2;
        this.floatprice3 = outboundMx.floatprice3;
        this.materials_d = outboundMx.materials_d;
        this.netprice = outboundMx.netprice;
        this.outqty = outboundMx.outqty;
        this.price = outboundMx.price;
        this.priceqty = outboundMx.priceqty;
        this.pricetype = outboundMx.pricetype;
        this.printid = outboundMx.printid;
        this.remark = outboundMx.remark;
        this.remarkmx = outboundMx.remarkmx;
        this.spec_d = outboundMx.spec_d;
        this.batchNo = outboundMx.batchNo;
        this.productid = outboundMx.productid;
        this.outboundid = outboundMx.outboundid;
        this.inventoryid = outboundMx.inventoryid;
        this.warehouseid = outboundMx.warehouseid;
        this.otherUnit = outboundMx.otherUnit;
        this.otherUnitConversionRate = outboundMx.otherUnitConversionRate;
        this.kz_productCode = outboundMx.kz_productCode;
        this.kz_productName = outboundMx.kz_productName;
        this.kz_spec = outboundMx.kz_spec;
        this.kz_materials = outboundMx.kz_materials;
        this.kz_remark = outboundMx.kz_remark;
        this.kz_spec_d = outboundMx.kz_spec_d;
        this.kz_materials_d = outboundMx.kz_materials_d;
        this.remark1 = outboundMx.remark1;
        this.remark2 = outboundMx.remark2;
        this.remark3 = outboundMx.remark3;
        this.remark4 = outboundMx.remark4;
        this.remark5 = outboundMx.remark5;
        this.returnGoodsQty = outboundMx.returnGoodsQty;
        return this
    }
}
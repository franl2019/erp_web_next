import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IsInt, IsNumber, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOutboundMxCreateDto implements IOutboundMx{
    @IsNumber()
    @NotEquals(0)
    agio: number;
    @IsNumber()
    @NotEquals(0)
    agio1: number;
    @IsNumber()
    @NotEquals(0)
    agio2: number;
    @IsNumber()
    bzprice: number;
    @IsNumber()
    @NotEquals(0)
    bzqty: number;
    @IsNumber()
    @NotEquals(0)
    clientid: number;
    @IsNumber()
    floatprice1: number;
    @IsNumber()
    floatprice2: number;
    @IsNumber()
    floatprice3: number;
    @IsString()
    materials_d: string;
    @IsNumber()
    netprice: number;
    @IsNumber()
    @NotEquals(0)
    outqty: number;
    @IsNumber()
    price: number;
    @IsNumber()
    @NotEquals(0)
    priceqty: number;
    @IsInt()
    pricetype: number;
    @IsInt()
    printid: number;
    @IsString()
    remark: string;
    @IsString()
    remarkmx: string;
    @IsString()
    spec_d: string;
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


    constructor(outboundMx:IOutboundMx) {
        this.agio = outboundMx.agio;
        this.agio1 = outboundMx.agio1;
        this.agio2 = outboundMx.agio2;
        this.bzprice = outboundMx.bzprice;
        this.bzqty = outboundMx.bzqty;
        this.clientid = outboundMx.clientid;
        this.floatprice1 = outboundMx.floatprice1;
        this.floatprice2 = outboundMx.floatprice2;
        this.floatprice3 = outboundMx.floatprice3;
        this.inventoryid = outboundMx.inventoryid;
        this.materials_d = outboundMx.materials_d;
        this.netprice = outboundMx.netprice;
        this.outboundid = outboundMx.outboundid;
        this.outqty = outboundMx.outqty;
        this.price = outboundMx.price;
        this.priceqty = outboundMx.priceqty;
        this.pricetype = outboundMx.pricetype;
        this.printid = outboundMx.printid;
        this.productid = outboundMx.productid;
        this.remark = outboundMx.remark;
        this.remarkmx = outboundMx.remarkmx;
        this.spec_d = outboundMx.spec_d;
        this.warehouseid = outboundMx.warehouseid;
    }
}
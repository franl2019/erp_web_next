import {IInboundMx} from "@/module/inboundMx/IInboundMx";
import {IsInt, IsNumber, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {IProduct} from "@/module/product/product";

export class BuyInboundMxCreateDto implements IInboundMx {
    @IsInt()
    inboundid: number;
    @IsInt()
    @NotEquals(0)
    productid: number;
    @IsInt()
    clientid: number;
    @IsInt()
    printid: number;
    @IsNumber()
    inqty: number;
    @IsNumber()
    bzqty: number;
    @IsNumber()
    price: number;
    @IsNumber()
    bzprice: number;
    @IsNumber()
    priceqty: number;
    @IsNumber()
    netprice: number;
    @IsNumber()
    @NotEquals(0)
    agio: number;
    @IsNumber()
    @NotEquals(0)
    agio1: number;
    @IsNumber()
    @NotEquals(0)
    agio2: number;
    @IsInt()
    pricetype: number;
    @IsString()
    spec_d: string;
    @IsString()
    materials_d: string;
    @IsString()
    remark: string;
    @IsString()
    remarkmx: string;


    constructor() {
        this.inboundid = 0;
        this.productid = 0;
        this.clientid = 0;
        this.printid = 0;
        this.inqty = 0;
        this.bzqty = 0;
        this.price = 0;
        this.bzprice = 0;
        this.priceqty = 0;
        this.netprice = 0;
        this.agio = 1;
        this.agio1 = 1;
        this.agio2 = 1;
        this.pricetype = 0;
        this.spec_d = "";
        this.materials_d = "";
        this.remark = "";
        this.remarkmx = "";
    }

    public setProductToMx(product: IProduct) {
        this.productid = product.productid;
    }


}
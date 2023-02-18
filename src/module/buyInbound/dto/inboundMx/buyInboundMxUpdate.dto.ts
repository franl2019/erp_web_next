import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {BuyInboundMxCreateDto} from "@/module/buyInbound/dto/inboundMx/buyInboundMxCreate.dto";
import {IInboundMx} from "@/module/inboundMx/IInboundMx";

export class BuyInboundMxUpdateDto extends BuyInboundMxCreateDto {
    @IsInt()
    @NotEquals(0)
    inboundid: number;

    constructor(buyInboundMx?: IInboundMx) {
        super();
        this.inboundid = 0
        if (buyInboundMx) {
            this.inboundid = buyInboundMx.inboundid;
            this.productid = buyInboundMx.productid;
            this.clientid = buyInboundMx.clientid;
            this.printid = buyInboundMx.printid;
            this.inqty = buyInboundMx.inqty;
            this.bzqty = buyInboundMx.bzqty;
            this.price = buyInboundMx.price;
            this.bzprice = buyInboundMx.bzprice;
            this.priceqty = buyInboundMx.priceqty;
            this.netprice = buyInboundMx.netprice;
            this.agio = buyInboundMx.agio;
            this.agio1 = buyInboundMx.agio1;
            this.agio2 = buyInboundMx.agio2;
            this.pricetype = buyInboundMx.pricetype;
            this.spec_d = buyInboundMx.spec_d;
            this.materials_d = buyInboundMx.materials_d;
            this.remark = buyInboundMx.remark;
            this.remarkmx = buyInboundMx.remarkmx;
        }
    }

}
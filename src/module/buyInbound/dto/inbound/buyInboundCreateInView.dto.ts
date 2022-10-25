import {BuyInboundCreateDto} from "@/module/buyInbound/dto/inbound/buyInboundCreate.dto";
import {IBuyInboundInView} from "@/module/buyInbound/dto/inbound/types/buyInboundInView";

export class BuyInboundCreateInViewDto extends BuyInboundCreateDto implements IBuyInboundInView{

    buyname: string;
    clientname: string;
    warehousename: string;

    constructor() {
        super();
        this.buyname = "";
        this.clientname = "";
        this.warehousename = "";
    }
}
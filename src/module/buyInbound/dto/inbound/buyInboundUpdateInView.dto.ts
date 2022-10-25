import {BuyInboundUpdateDto} from "@/module/buyInbound/dto/inbound/buyInboundUpdate.dto";
import {IBuyInboundInView} from "@/module/buyInbound/dto/inbound/types/buyInboundInView";

export class BuyInboundUpdateInViewDto extends BuyInboundUpdateDto implements IBuyInboundInView{

    buyname: string;
    clientname: string;
    warehousename: string;

    constructor() {
        super();
        this.buyname = "";
        this.clientname = "";
        this.warehousename = "";
    }

    public init(buyInboundInView:IBuyInboundInView){
        super.init(buyInboundInView);
        this.buyname = buyInboundInView.buyname;
        this.clientname = buyInboundInView.clientname;
        this.warehousename = buyInboundInView.warehousename;
        return this
    }

}
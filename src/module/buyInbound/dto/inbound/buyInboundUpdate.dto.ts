import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {BuyInboundCreateDto} from "@/module/buyInbound/dto/inbound/buyInboundCreate.dto";
import {IInbound} from "@/module/inbound/IInbound";


export class BuyInboundUpdateDto extends BuyInboundCreateDto {
    @IsInt()
    @NotEquals(0)
    inboundid: number;

    constructor() {
        super();
        this.inboundid = 0
        return this
    }
    
    public init(buyInbound:IInbound){
            this.buyid = buyInbound.buyid;
            this.clientid = buyInbound.clientid;
            this.warehouseid = buyInbound.warehouseid;
            this.inboundid = buyInbound.inboundid;
            this.inboundcode = buyInbound.inboundcode;
            this.inboundtype = buyInbound.inboundtype;
            this.indate = buyInbound.indate;
            this.moneytype = buyInbound.moneytype;
            this.printcount = buyInbound.printcount;
            this.relatednumber = buyInbound.relatednumber;
            this.remark1 = buyInbound.remark1;
            this.remark2 = buyInbound.remark2;
            this.remark3 = buyInbound.remark3;
            this.remark4 = buyInbound.remark4;
            this.remark5 = buyInbound.remark5;
            this.creater = buyInbound.creater;
            this.createdAt = buyInbound.createdAt;
            this.updater = buyInbound.updater;
            this.updatedAt = buyInbound.updatedAt;
            this.level1date = buyInbound.level1date;
            this.level1name = buyInbound.level1name;
            this.level1review = buyInbound.level1review;
            this.level2date = buyInbound.level2date;
            this.level2name = buyInbound.level2name;
            this.level2review = buyInbound.level2review;
            this.del_uuid = buyInbound.del_uuid;
            this.deletedAt = buyInbound.deletedAt;
            this.deleter = buyInbound.deleter;
    }

}
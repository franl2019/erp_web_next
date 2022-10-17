import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {SaleOutboundMxCreateDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxCreate.dto";

export class SaleOutboundMxUpdateDto extends SaleOutboundMxCreateDto{

    @IsInt()
    @NotEquals(0)
    outboundid: number;

    constructor(outboundMx:IOutboundMx) {
        super(outboundMx);
        this.outboundid = outboundMx.outboundid;
    }
}
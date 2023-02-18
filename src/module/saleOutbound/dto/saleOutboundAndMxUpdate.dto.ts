import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {IOutbound} from "@/module/outbound/types/IOutbound";
import {SaleOutboundAndMxCreateDto} from "@/module/saleOutbound/dto/saleOutboundAndMxCreate.dto";

export interface ISaleOutboundUpdateDto extends IOutbound {
    outboundMx: IOutboundMx[];
}

export class SaleOutboundAndMxUpdateDto extends SaleOutboundAndMxCreateDto {
    @IsInt()
    @NotEquals(0)
    outboundid: number;

    constructor() {
        super();
        this.outboundid = 0;
    }
}
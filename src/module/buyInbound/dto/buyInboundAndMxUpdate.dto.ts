import {BuyInboundAndMxCreateDto} from "@/module/buyInbound/dto/buyInboundAndMxCreate.dto";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class BuyInboundAndMxUpdateDto extends BuyInboundAndMxCreateDto{

    @IsInt()
    @NotEquals(0)
    inboundid:number;

    constructor() {
        super();
        this.inboundid = 0;
    }
}
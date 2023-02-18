import {IBuyInboundMxFindDto} from "@/module/buyInbound/dto/inboundMx/types/buyInboundMxFind";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class BuyInboundMxFindDto implements IBuyInboundMxFindDto{
    @IsInt()
    @NotEquals(0)
    inboundid:number = 0;
}
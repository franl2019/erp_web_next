import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export interface ISaleOutboundL1Review {
    outboundid:number;
}

export class SaleOutboundL1Review implements ISaleOutboundL1Review{
    @IsInt()
    @NotEquals(0)
    outboundid:number = 0;
}
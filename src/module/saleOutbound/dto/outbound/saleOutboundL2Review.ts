import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export interface ISaleOutboundL2Review {
    outboundid:number;
}

export class SaleOutboundL2Review implements ISaleOutboundL2Review{

    @IsInt()
    @NotEquals(0)
    outboundid: number = 0;
}

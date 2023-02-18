import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class BuyInboundL2ReviewDto {
    @IsInt()
    @NotEquals(0)
    inboundid:number = 0
}
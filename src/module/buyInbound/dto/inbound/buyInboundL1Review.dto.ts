import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class BuyInboundL1ReviewDto {
    @IsInt()
    @NotEquals(0)
    inboundid:number = 0
}
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class BuyInboundDeleteDto {
    @IsInt()
    @NotEquals(0)
    inboundid:number = 0
}
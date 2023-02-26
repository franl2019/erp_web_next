import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export interface ISaleOutboundMxFindDto {
    outboundid: number
}

export class SaleOutboundMxFindDto implements ISaleOutboundMxFindDto {
    @IsInt()
    @NotEquals(0)
    outboundid: number;

    constructor(outboundid: number) {
        this.outboundid = outboundid
    }
}
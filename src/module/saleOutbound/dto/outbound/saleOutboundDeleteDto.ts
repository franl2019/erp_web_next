import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export interface IDeleteOutboundDto {
    outboundid:number;
}

export class SaleOutboundDeleteDto implements IDeleteOutboundDto{
    @IsInt()
    @NotEquals(0)
    outboundid:number = 0;
}
export interface IDeleteOutboundDto {
    outboundid:number;
}

export class DeleteOutboundSaleDto implements IDeleteOutboundDto{
    outboundid:number = 0;
}
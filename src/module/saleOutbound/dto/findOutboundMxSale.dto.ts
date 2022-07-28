export interface IFindOutboundMxDto {
    outboundid: number
}

export class FindOutboundMxSaleDto implements IFindOutboundMxDto {
    outboundid: number = 0;
}
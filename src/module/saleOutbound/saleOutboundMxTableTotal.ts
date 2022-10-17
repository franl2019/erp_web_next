interface ISaleOutboundMxTableTotal {
    sn: string;
    priceqty:string
    amt: number;
}

export class SaleOutboundMxTableTotal implements ISaleOutboundMxTableTotal {
    sn: string = '合计：';
    priceqty:string = '合计金额：'
    amt: number = 0;
}
import {IBuyInboundMxTableTotal} from "@/module/buyInbound/types/IBuyInboundMxTableTotal";

export class BuyInboundMxTableTotal implements IBuyInboundMxTableTotal {
    sn: string = '合计：';
    priceqty = '合计金额：'
    amt: number = 0;
}
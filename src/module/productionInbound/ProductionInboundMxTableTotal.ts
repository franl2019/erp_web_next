import {IProductionInboundMxTableTotal} from "@/module/productionInbound/types/IProductionInboundMxTableTotal";

export class ProductionInboundMxTableTotal implements IProductionInboundMxTableTotal {
    sn: string = '合计：';
    priceqty:string = '合计金额：'
    amt: number = 0;
}
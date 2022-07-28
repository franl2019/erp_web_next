import {IOutbound} from "@/module/saleOutbound/outboundSale";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IClient} from "@/module/client/client";
import {IWarehouse} from "@/module/warehouse/warehouse";

export interface ISaleOutboundMxReport extends IOutbound,IOutboundMx,IClient,IWarehouse{}
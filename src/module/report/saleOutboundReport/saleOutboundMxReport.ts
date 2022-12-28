import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IClient} from "@/module/client/client";
import {IWarehouse} from "@/module/warehouse/warehouse";
import {IOutbound} from "@/module/outbound/types/IOutbound";

export interface ISaleOutboundMxReport extends IOutbound, IOutboundMx, Omit<IClient, "operateareaid">, IWarehouse {

}
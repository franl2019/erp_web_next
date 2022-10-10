import {IInbound} from "@/module/inbound/IInbound";

//查询生产进仓单的返回结果
export interface IProductionInboundTableData extends IInbound {
    warehousename: string;
    clientname?: string;
    buyname?: string;
}
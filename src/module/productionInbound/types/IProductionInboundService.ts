import {IInbound} from "@/types/inbound/IInbound";
import {IInboundMx} from "@/types/inboundMx/IInboundMx";

//新增生产进仓单接口
export interface IProductionInboundCreateDto extends IInbound {
    inboundmx: IInboundMx[]
}

export interface IProductionInboundMxFindDto {
    inboundid: number;
}

export interface IProductionInboundFindDto {
    warehouseids: number[];
    operateareaids: number[];
    clientid: number;
    startDate: string;
    endDate: string;
    inboundid: number;
    inboundcode: string;
    inboundtype: number;
    relatednumber: string;
    page: number;
    pagesize: number;
}
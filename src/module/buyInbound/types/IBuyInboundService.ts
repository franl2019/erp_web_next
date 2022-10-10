import {IInbound} from "@/module/inbound/IInbound";
import {IInboundMx} from "@/module/inboundMx/IInboundMx";

//新增生产进仓单接口
export interface IBuyInboundCreateDto extends IInbound {
    inboundmx: IInboundMx[]
}

export interface IBuyInboundMxFindDto {
    inboundid: number;
}

export interface IBuyInboundFindDto {
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


    buyname: string;
    moneytype: string;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
}

//查询生产进仓单的返回结果
export interface IBuyInboundFind extends IInbound {
    warehousename: string;
    clientname?: string;
    buyname?: string;
}
import {getToday} from "@/utils";

export interface IOutbound {
    outboundid: number;
    outboundcode: string;
    outboundtype: number;
    outdate: string;
    moneytype: string;
    relatednumber: string;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
    printcount: number;
    level1review: number;
    level1name: string;
    level1date: Date | null;
    level2review: number;
    level2name: string;
    level2date: Date | null;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    warehouseid: number;
    clientid: number;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
}

export interface ISaleOutboundFindTable extends IOutbound {
    clientname: string
}

export class SaleOutboundFindTable implements ISaleOutboundFindTable {
    outboundid: number = 0;
    outboundcode: string = "";
    outboundtype: number = 8;
    outdate: string = getToday();
    moneytype: string = "";
    relatednumber: string = "";
    remark1: string = "";
    remark2: string = "";
    remark3: string = "";
    remark4: string = "";
    remark5: string = "";
    printcount: number = 0;
    level1review: number = 0;
    level1name: string = "";
    level1date: Date | null = null;
    level2review: number = 0;
    level2name: string = "";
    level2date: Date | null = null;
    creater: string = "";
    createdAt: Date | null = null;
    updater: string = "";
    updatedAt: Date | null = null;
    warehouseid: number = 0;
    clientid: number = 0;
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";
    clientname: string = "";
}
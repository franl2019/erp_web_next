import {IOutbound} from "@/module/outbound/types/IOutbound";

interface ISaleOutboundUpdateDto extends IOutbound{
    clientname:string
}

export class SaleOutboundUpdateDto implements ISaleOutboundUpdateDto{
    clientid: number;
    clientname: string;
    createdAt: Date | null;
    creater: string;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
    level1date: Date | null;
    level1name: string;
    level1review: number;
    level2date: Date | null;
    level2name: string;
    level2review: number;
    moneytype: string;
    outboundcode: string;
    outboundid: number;
    outboundtype: number;
    outdate: string;
    printcount: number;
    relatednumber: string;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
    updatedAt: Date | null;
    updater: string;
    warehouseid: number;


    constructor(outboundUpdateDto:ISaleOutboundUpdateDto) {
        this.clientid = outboundUpdateDto.clientid;
        this.clientname = outboundUpdateDto.clientname
        this.createdAt = outboundUpdateDto.createdAt;
        this.creater = outboundUpdateDto.creater;
        this.del_uuid = outboundUpdateDto.del_uuid;
        this.deletedAt = outboundUpdateDto.deletedAt;
        this.deleter = outboundUpdateDto.deleter;
        this.level1date = outboundUpdateDto.level1date;
        this.level1name = outboundUpdateDto.level1name;
        this.level1review = outboundUpdateDto.level1review;
        this.level2date = outboundUpdateDto.level2date;
        this.level2name = outboundUpdateDto.level2name;
        this.level2review = outboundUpdateDto.level2review;
        this.moneytype = outboundUpdateDto.moneytype;
        this.outboundcode = outboundUpdateDto.outboundcode;
        this.outboundid = outboundUpdateDto.outboundid;
        this.outboundtype = outboundUpdateDto.outboundtype;
        this.outdate = outboundUpdateDto.outdate;
        this.printcount = outboundUpdateDto.printcount;
        this.relatednumber = outboundUpdateDto.relatednumber;
        this.remark1 = outboundUpdateDto.remark1;
        this.remark2 = outboundUpdateDto.remark2;
        this.remark3 = outboundUpdateDto.remark3;
        this.remark4 = outboundUpdateDto.remark4;
        this.remark5 = outboundUpdateDto.remark5;
        this.updatedAt = outboundUpdateDto.updatedAt;
        this.updater = outboundUpdateDto.updater;
        this.warehouseid = outboundUpdateDto.warehouseid;
    }
}
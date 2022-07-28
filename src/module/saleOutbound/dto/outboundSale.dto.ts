import {IOutbound} from "@/module/saleOutbound/outboundSale";
import {getToday} from "@/utils";
import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";

export interface IOutboundDto extends IOutbound{
    outboundMx:IOutboundMx[]
}

export class OutboundSaleDto implements IOutboundDto{
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
    outboundMx:IOutboundMx[] = [];

    public setHead(createOutboundDto:IOutbound){
        this.outboundid = createOutboundDto.outboundid;
        this.outboundcode = createOutboundDto.outboundcode;
        this.outboundtype = createOutboundDto.outboundtype;
        this.outdate = createOutboundDto.outdate;
        this.moneytype = createOutboundDto.moneytype;
        this.relatednumber = createOutboundDto.relatednumber;
        this.remark1 = createOutboundDto.remark1;
        this.remark2 = createOutboundDto.remark2;
        this.remark3 = createOutboundDto.remark3;
        this.remark4 = createOutboundDto.remark4;
        this.remark5 = createOutboundDto.remark5;
        this.printcount = createOutboundDto.printcount;
        this.level1review = createOutboundDto.level1review;
        this.level1name = createOutboundDto.level1name;
        this.level1date = createOutboundDto.level1date;
        this.level2review = createOutboundDto.level2review;
        this.level2name = createOutboundDto.level2name;
        this.level2date = createOutboundDto.level2date;
        this.creater = createOutboundDto.creater;
        this.createdAt = createOutboundDto.createdAt;
        this.updater = createOutboundDto.updater;
        this.updatedAt = createOutboundDto.updatedAt;
        this.warehouseid = createOutboundDto.warehouseid;
        this.clientid = createOutboundDto.clientid;
        this.del_uuid = createOutboundDto.del_uuid;
        this.deletedAt = createOutboundDto.deletedAt;
        this.deleter = createOutboundDto.deleter;
    }

    public setOutboundMx(outboundMxList:IOutboundMx[]){
        this.outboundMx = outboundMxList;
    }
}
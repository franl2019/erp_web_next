import {IInbound} from "@/module/inbound/IInbound";
import {IInboundMx} from "@/module/inboundMx/IInboundMx";
import {IProductionInboundCreateDto} from "@/module/productionInbound/types/IProductionInboundService";
import {getToday} from "@/utils";

export class ProductionInboundCreateDto implements IProductionInboundCreateDto {
    inboundid: number = 0;
    inboundcode: string = "";
    inboundtype: number = 0;
    indate: string = getToday();
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
    buyid: number  = 0;
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";
    inboundmx: IInboundMx[] = [];

    public setHead(inboundHead: IInbound) {
        this.inboundid = inboundHead.inboundid;
        this.inboundcode = inboundHead.inboundcode;
        this.inboundtype = inboundHead.inboundtype;
        this.indate = inboundHead.indate;
        this.moneytype = inboundHead.moneytype;
        this.relatednumber = inboundHead.relatednumber;
        this.remark1 = inboundHead.remark1;
        this.remark2 = inboundHead.remark2;
        this.remark3 = inboundHead.remark3;
        this.remark4 = inboundHead.remark4;
        this.remark5 = inboundHead.remark5;
        this.printcount = inboundHead.printcount;
        this.level1review = inboundHead.level1review;
        this.level1name = inboundHead.level1name;
        this.level1date = inboundHead.level1date;
        this.level2review = inboundHead.level2review;
        this.level2name = inboundHead.level2name;
        this.level2date = inboundHead.level2date;
        this.creater = inboundHead.creater;
        this.createdAt = inboundHead.createdAt;
        this.updater = inboundHead.updater;
        this.updatedAt = inboundHead.updatedAt;
        this.warehouseid = inboundHead.warehouseid;
        this.clientid = inboundHead.clientid;
        this.buyid = inboundHead.buyid;
        this.del_uuid = inboundHead.del_uuid;
        this.deletedAt = inboundHead.deletedAt;
        this.deleter = inboundHead.deleter;
    }

    public setInboundMx(inboundMx: IInboundMx[]) {
        this.inboundmx = inboundMx;
    }
}
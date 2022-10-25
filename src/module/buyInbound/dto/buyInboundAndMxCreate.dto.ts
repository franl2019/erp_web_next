import {IInbound} from "@/module/inbound/IInbound";
import {IInboundMx} from "@/module/inboundMx/IInboundMx";
import {getToday, useDateFormat} from "@/utils";
import {CodeType} from "@/types/CodeType";
import {IsArray, IsDateString, IsInt, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

//新增生产进仓单接口
export interface IBuyInboundAndMxCreateDto extends IInbound {
    inboundmx: IInboundMx[];
}

export class BuyInboundAndMxCreateDto implements IBuyInboundAndMxCreateDto {

    inboundid: number;
    inboundcode: string;

    @IsInt()
    @NotEquals(0)
    buyid: number;
    @IsInt()
    @NotEquals(0)
    warehouseid: number;
    @IsInt()
    clientid: number;
    @IsString()
    moneytype: string;
    @IsInt()
    printcount: number;
    @IsString()
    relatednumber: string;
    @IsString()
    remark1: string;
    @IsString()
    remark2: string;
    @IsString()
    remark3: string;
    @IsString()
    remark4: string;
    @IsString()
    remark5: string;


    @IsInt()
    inboundtype: number;
    @IsDateString()
    indate: string;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    level1date: Date | null;
    level1name: string;
    level1review: number;
    level2date: Date | null;
    level2name: string;
    level2review: number;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
    @IsArray()
    inboundmx: IInboundMx[];


    constructor() {
        this.buyid = 0;
        this.clientid = 0;
        this.createdAt = null;
        this.creater = "";
        this.del_uuid = 0;
        this.deletedAt = null;
        this.deleter = "";
        this.inboundcode = "";
        this.inboundid = 0;
        this.inboundmx = [];
        this.inboundtype = CodeType.buyInbound;
        this.indate = getToday();
        this.level1date = null;
        this.level1name = "";
        this.level1review = 0;
        this.level2date = null;
        this.level2name = "";
        this.level2review = 0;
        this.moneytype = "";
        this.printcount = 0;
        this.relatednumber = "";
        this.remark1 = "";
        this.remark2 = "";
        this.remark3 = "";
        this.remark4 = "";
        this.remark5 = "";
        this.updatedAt = null;
        this.updater = "";
        this.warehouseid = 0;
        return this
    }

    public setHead(inbound: IInbound) {
        this.inboundid = inbound.inboundid;
        this.inboundcode = inbound.inboundcode;
        this.inboundtype = inbound.inboundtype;
        this.indate = useDateFormat(inbound.indate);
        this.moneytype = inbound.moneytype;
        this.relatednumber = inbound.relatednumber;
        this.remark1 = inbound.remark1;
        this.remark2 = inbound.remark2;
        this.remark3 = inbound.remark3;
        this.remark4 = inbound.remark4;
        this.remark5 = inbound.remark5;
        this.printcount = inbound.printcount;
        this.level1review = inbound.level1review;
        this.level1name = inbound.level1name;
        this.level1date = inbound.level1date;
        this.level2review = inbound.level2review;
        this.level2name = inbound.level2name;
        this.level2date = inbound.level2date;
        this.creater = inbound.creater;
        this.createdAt = inbound.createdAt;
        this.updater = inbound.updater;
        this.updatedAt = inbound.updatedAt;
        this.warehouseid = inbound.warehouseid;
        this.clientid = inbound.clientid;
        this.buyid = inbound.buyid;
        this.del_uuid = inbound.del_uuid;
        this.deletedAt = inbound.deletedAt;
        this.deleter = inbound.deleter;
        return this;
    }

    public setInboundMx(inboundMx: IInboundMx[]) {
        this.inboundmx = inboundMx;
        return this;
    }


}
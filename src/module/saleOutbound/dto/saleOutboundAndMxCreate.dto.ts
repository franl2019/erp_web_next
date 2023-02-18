import {IOutboundMx} from "@/module/outbound/types/IOutboundMx";
import {IsDateString, IsInt, IsString, IsArray, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {useGetToday, useDateFormat} from "@/utils";
import {CodeType} from "@/types/CodeType";
import {IOutbound} from "@/module/outbound/types/IOutbound";

export interface ISaleOutboundCreateDto extends IOutbound {
    outboundMx: IOutboundMx[];
}

export class SaleOutboundAndMxCreateDto implements ISaleOutboundCreateDto{
    outboundid: number;
    outboundcode: string;
    @IsDateString()
    outdate: string;
    @IsString()
    deliveryDate: string;
    @IsString()
    moneytype: string;
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
    @NotEquals(0)
    operateareaid:number;
    @IsInt()
    warehouseid: number;
    @IsInt()
    clientid: number;
    @IsArray()
    outboundMx: IOutboundMx[];

    printcount: number;
    outboundtype: number;
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
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;


    constructor() {
        this.outboundid = 0;
        this.outboundcode = "";
        this.outdate = useGetToday();
        this.deliveryDate = "";
        this.moneytype = "";
        this.relatednumber = "";
        this.remark1 = "";
        this.remark2 = "";
        this.remark3 = "";
        this.remark4 = "";
        this.remark5 = "";
        this.operateareaid = 0;
        this.warehouseid = 0;
        this.clientid = 0;
        this.outboundMx = [];
        this.printcount = 0;
        this.outboundtype = CodeType.XS;
        this.level1review = 0;
        this.level1name = "";
        this.level1date = null;
        this.level2review = 0;
        this.level2name = "";
        this.level2date = null;
        this.creater = "";
        this.createdAt = null;
        this.updater = "";
        this.updatedAt = null;
        this.del_uuid = 0;
        this.deletedAt = null;
        this.deleter = "";
        return this
    }

    setHead(outbound:IOutbound){
        this.outboundid = outbound.outboundid;
        this.outboundcode = outbound.outboundcode;
        this.outdate = useDateFormat(outbound.outdate);
        this.deliveryDate = useDateFormat(outbound.deliveryDate);
        this.moneytype = outbound.moneytype;
        this.relatednumber = outbound.relatednumber;
        this.remark1 = outbound.remark1;
        this.remark2 = outbound.remark2;
        this.remark3 = outbound.remark3;
        this.remark4 = outbound.remark4;
        this.remark5 = outbound.remark5;
        this.operateareaid = outbound.operateareaid;
        this.warehouseid = outbound.warehouseid;
        this.clientid = outbound.clientid;
        this.printcount = outbound.printcount;
        this.outboundtype = outbound.outboundtype;
        this.level1review = outbound.level1review;
        this.level1name = outbound.level1name;
        this.level1date = outbound.level1date;
        this.level2review = outbound.level2review;
        this.level2name = outbound.level2name;
        this.level2date = outbound.level2date;
        this.creater = outbound.creater;
        this.createdAt = outbound.createdAt;
        this.updater = outbound.updater;
        this.updatedAt = outbound.updatedAt;
        this.del_uuid = outbound.del_uuid;
        this.deletedAt = outbound.deletedAt;
        this.deleter = outbound.deleter;
        return this
    }

    setOrderMx(outboundMx: IOutboundMx[]){
        this.outboundMx = outboundMx;
        return this
    }
}
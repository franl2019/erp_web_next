import {IInbound} from "@/module/inbound/IInbound";
import {CodeType} from "@/types/CodeType";
import {useGetToday} from "@/utils";
import {IsDateString, IsInt, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";


export class BuyInboundCreateDto implements IInbound {
    @IsInt()
    @NotEquals(0)
    buyid: number;
    //采购进仓单客户暂时不检查
    @IsInt()
    clientid: number;
    @IsInt()
    @NotEquals(0)
    warehouseid: number;
    @IsInt()
    inboundid: number;
    @IsString()
    inboundcode: string;
    @IsInt()
    inboundtype: number;
    @IsDateString()
    indate: string;
    @IsString()
    moneytype: string;
    @IsInt()
    printcount: number;
    @IsString()
    relatednumber: string;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
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

    constructor() {
        this.inboundid = 0;
        this.inboundcode = "";
        this.buyid = 0;
        this.clientid = 0;
        this.warehouseid = 0;
        this.inboundtype = CodeType.buyInbound;
        this.indate = useGetToday();
        this.moneytype = "";
        this.printcount = 0;
        this.relatednumber = "";
        this.remark1 = "";
        this.remark2 = "";
        this.remark3 = "";
        this.remark4 = "";
        this.remark5 = "";
        this.creater = "";
        this.createdAt = null;
        this.updater = "";
        this.updatedAt = null;
        this.del_uuid = 0;
        this.deleter = "";
        this.deletedAt = null;
        this.level1review = 0;
        this.level1name = "";
        this.level1date = null;
        this.level2review = 0;
        this.level2name = "";
        this.level2date = null;
    }
}
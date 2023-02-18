import {useGetToday} from "@/utils";
import {IOutbound} from "@/module/outbound/types/IOutbound";

interface ISaleOutboundCreateDto extends IOutbound{
    clientname:string
}

export class SaleOutboundCreateDto implements ISaleOutboundCreateDto{
    outboundid: number = 0;
    outboundcode: string = "";
    outboundtype: number = 8;
    outdate: string = useGetToday();
    deliveryDate: string = "";
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
    operateareaid:number = 0;
    warehouseid: number = 0;
    clientid: number = 0;
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";
    clientname: string = "";
}
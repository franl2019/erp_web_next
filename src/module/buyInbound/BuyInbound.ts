import {getToday} from "@/utils";
import {IBuyInboundFind} from "@/module/buyInbound/types/IBuyInboundService";


export class BuyInbound implements IBuyInboundFind {
    inboundid: number = 0;
    inboundcode: string = "";
    inboundtype: number = 1; //采购进仓单
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
    buyid: number = 0;
    buyname:string = "";
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";
    clientname: string = "";
    warehousename: string = "";
}
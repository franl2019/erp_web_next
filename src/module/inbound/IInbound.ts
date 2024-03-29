export interface IInbound {
    inboundid: number;
    inboundcode: string;
    inboundtype: number;
    indate: string;
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
    buyid: number;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
}
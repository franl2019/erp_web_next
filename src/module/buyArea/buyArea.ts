export interface IBuyArea {
    buyareaid: number;
    buyareacode: string;
    buyareaname: string;
    sonflag: number;
    parentid: number;
    creater: string;
    createdAt: Date;
    updater: string;
    updatedAt: Date;
    del_uuid:number;
    deletedAt:Date;
    deleter:string;
}

export interface IBuyAreaTree extends IBuyArea{
    children:IBuyAreaTree[]
}

export class BuyArea implements IBuyArea{
    buyareaid: number = 0;
    buyareacode: string = "";
    buyareaname: string = "";
    sonflag: number = 0;
    parentid: number = 0;
    creater: string = "";
    createdAt: Date = new Date();
    updater: string = "";
    updatedAt: Date = new Date();
    del_uuid: number = 0;
    deletedAt: Date = new Date();
    deleter: string = "";
}

export class BuyAreaTree implements IBuyAreaTree{
    buyareaid: number = 0;
    buyareacode: string = "";
    buyareaname: string = "";
    sonflag: number = 0;
    parentid: number = 0;
    creater: string = "";
    createdAt: Date = new Date();
    updater: string = "";
    updatedAt: Date = new Date();
    del_uuid: number = 0;
    deletedAt: Date = new Date();
    deleter: string = "";

    children:IBuyAreaTree[] = [];
}



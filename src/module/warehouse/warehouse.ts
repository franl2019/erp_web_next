export interface IWarehouse {
    warehouseid: number;
    warehousename: string;
    warehousecode: string;
    warehousetype: number;
    useflag: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deletedAt: Date | null;
    deleter:string;
}

export class Warehouse implements IWarehouse{
    warehouseid: number = 0;
    warehousename: string = "";
    warehousecode: string = "";
    warehousetype: number = 0;
    useflag: number = 0;
    creater: string = "";
    createdAt: Date = new Date();
    updater: string = "";
    updatedAt: Date = new Date();
    del_uuid: number = 0;
    deletedAt: Date = new Date();
    deleter:string = "";
}
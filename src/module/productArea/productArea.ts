export interface IProductArea {
    productareaid: number;
    productareacode: string;
    productareaname: string;
    sonflag: number;
    parentid: number;
    creater: string;
    createdAt: Date;
    updater: string;
    updatedAt: Date;
    del_uuid: number;
    deletedAt: Date;
    deleter: string;
}

export class ProductArea implements IProductArea {
    productareaid: number = 0;
    productareacode: string = "";
    productareaname: string = "";
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

export interface IProductAreaTree extends IProductArea{
    children:IProductAreaTree[]
}

export class ProductAreaTree implements IProductAreaTree{
    productareaid: number = 0;
    productareacode: string = "";
    productareaname: string = "";
    sonflag: number = 0;
    parentid: number = 0;
    creater: string = "";
    createdAt: Date = new Date();
    updater: string = "";
    updatedAt: Date = new Date();
    del_uuid: number = 0;
    deletedAt: Date = new Date();
    deleter: string = "";
    children:IProductAreaTree[] = [];
}
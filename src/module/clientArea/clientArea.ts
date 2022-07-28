export interface IClientArea {
    clientareaid: number;
    clientareacode: string;
    clientareaname: string;
    sonflag: number;
    parentid: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
}

export class ClientArea implements IClientArea {
    clientareaid: number = 0;
    clientareacode: string = "";
    clientareaname: string = "";
    sonflag: number = 0;
    parentid: number = 0;
    creater: string = "";
    createdAt: Date | null = null;
    updater: string = "";
    updatedAt: Date | null = null
    del_uuid: number = 0;
    deletedAt: Date | null = null
    deleter: string = "";
}

export interface ICreateClientAreaDto {
    clientareacode: string;
    clientareaname: string;
    parentid: number;
}

export interface IUpdateClientAreaDto {
    clientareaid: number;
    clientareacode: string;
    clientareaname: string;
    parentid: number;
}

export interface IClientAreaTree extends IClientArea {
    children: IClientAreaTree[]
}


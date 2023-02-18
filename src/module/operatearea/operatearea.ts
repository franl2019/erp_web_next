import {IOperatearea} from "@/module/operatearea/operatearea.service";

export class Operatearea implements IOperatearea {
    operateareaid: number = 0;
    operateareaname: string = "";
    operateareatype: number = 0;
    useflag: number = 0;
    creater: string = "";
    createdAt: Date | null = null;
    updater: string = "";
    updatedAt: Date | null = null;
    del_uuid: number = 0;
    deletedAt: Date | null = null;
    deleter: string = "";
}
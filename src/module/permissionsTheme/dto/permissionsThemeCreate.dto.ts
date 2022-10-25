import {IPermissionsTheme} from "@/module/permissionsTheme/permissionsTheme";

export class PermissionsThemeCreateDto implements IPermissionsTheme{

    permissionsThemeId: number;
    permissionsThemeName: string;
    printid: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deleter: string;
    deletedAt: Date | null;

    constructor() {
        this.permissionsThemeId = 0;
        this.permissionsThemeName = "";
        this.printid = 0;
        this.creater = "";
        this.createdAt = null;
        this.updater = "";
        this.updatedAt = null;
        this.del_uuid = 0;
        this.deleter = "";
        this.deletedAt = null;
    }
}
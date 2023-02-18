import {IPermissions} from "@/module/permissions/permissions";
import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";

export class PermissionsCreateDto implements IPermissions{
    permissionsId: number;
    @IsString()
    permissionsName: string;
    @IsString()
    permissionsCode:string;
    @IsInt()
    permissionsThemeId: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;

    constructor() {
        this.permissionsId = 0;
        this.permissionsName = "";
        this.permissionsCode = "";
        this.creater = "";
        this.createdAt = null;
        this.updater = "";
        this.updatedAt = null;
        this.del_uuid = 0;
        this.deletedAt = null;
        this.deleter = "";
        this.permissionsThemeId = 0;
    }


}
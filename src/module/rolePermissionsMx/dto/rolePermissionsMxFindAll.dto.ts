import {IRolePermissionsMxJoinPermissions, RolePermissionsCanType} from "@/module/rolePermissionsMx/rolePermissionsMx";
import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";

export class RolePermissionsMxFindAllDto implements IRolePermissionsMxJoinPermissions {

    @IsInt()
    roleId: number;
    @IsInt()
    permissionsId: number;
    @IsString()
    permissionsCode: string;
    @IsString()
    permissionsName: string;
    @IsInt()
    permissionsThemeId: number;
    @IsInt()
    can: RolePermissionsCanType;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    deleter: string;
    del_uuid: number;
    deletedAt: Date | null;


    constructor() {
        this.roleId = 0;
        this.permissionsId = 0;
        this.permissionsCode = "";
        this.permissionsName = "";
        this.permissionsThemeId = 0;
        this.can = RolePermissionsCanType.all;
        this.creater = "";
        this.createdAt = null;
        this.updater = "";
        this.updatedAt = null;
        this.deleter = "";
        this.del_uuid = 0;
        this.deletedAt = null;
    }
}
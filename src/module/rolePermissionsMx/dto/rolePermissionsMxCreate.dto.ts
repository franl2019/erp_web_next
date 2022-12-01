import {IRolePermissionsMx} from "@/module/rolePermissionsMx/rolePermissionsMx";
import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class RolePermissionsMxCreateDto implements IRolePermissionsMx {
    roleId: number;
    @IsInt()
    permissionsId: number;
    @IsInt()
    can: number;
    updater: string;
    updatedAt: Date | null;

    constructor(roleId: number, permissionsId: number, updater: string, updatedAt: Date | null, can: number) {
        this.roleId = roleId;
        this.permissionsId = permissionsId;
        this.updater = updater;
        this.updatedAt = updatedAt;
        this.can = can
    }

}
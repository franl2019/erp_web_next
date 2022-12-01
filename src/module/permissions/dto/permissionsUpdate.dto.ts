import {PermissionsCreateDto} from "@/module/permissions/dto/permissionsCreate.dto";
import {IPermissions} from "@/module/permissions/permissions";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class PermissionsUpdateDto extends PermissionsCreateDto {

    @IsInt()
    @NotEquals(0)
    permissionsId:number;

    constructor(permissions: IPermissions) {
        super();
        this.permissionsId = permissions.permissionsId;
        this.permissionsName = permissions.permissionsName;
        this.permissionsCode = permissions.permissionsCode;
        this.creater = permissions.creater;
        this.createdAt = permissions.createdAt;
        this.updater = permissions.updater;
        this.updatedAt = permissions.updatedAt;
        this.del_uuid = permissions.del_uuid;
        this.deletedAt = permissions.deletedAt;
        this.deleter = permissions.deleter;
        this.permissionsThemeId = permissions.permissionsThemeId;
    }
}
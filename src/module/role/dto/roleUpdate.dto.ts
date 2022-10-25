import {IRole} from "../role";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {RoleCreateDto} from "@/module/role/dto/roleCreate.dto";

export class RoleUpdateDto extends RoleCreateDto{
    @IsInt()
    @NotEquals(0)
    roleId: number

    constructor(role:IRole) {
        super()
        this.roleId = role.roleId;
        this.roleName = role.roleName;
        this.printid = role.printid;
        this.useflag = role.useflag;
        this.useflagDate = role.useflagDate;
        this.creater = role.creater;
        this.createdAt = role.createdAt;
        this.updater = role.updater;
        this.updatedAt = role.updatedAt;
        this.level1Review = role.level1Review;
        this.level1Name = role.level1Name;
        this.level1Date = role.level1Date;
        this.level2Review = role.level2Review;
        this.level2Name = role.level2Name;
        this.level2Date = role.level2Date;
        this.del_uuid = role.del_uuid;
        this.deleter = role.deleter;
        this.deletedAt = role.deletedAt;
    }
}
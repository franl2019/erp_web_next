import {IRole} from "../role";
import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class RoleDeleteDto implements IRole{
    @IsInt()
    roleId: number

    roleName: string
    printid: number
    useflag: number
    useflagDate: Date | null
    creater: string
    createdAt: Date | null
    updater: string
    updatedAt: Date | null
    level1Review: number
    level1Name: string
    level1Date: Date | null
    level2Review: number
    level2Name: string
    level2Date: Date | null
    del_uuid: number
    deleter: string
    deletedAt: Date | null

    constructor(role:IRole) {
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
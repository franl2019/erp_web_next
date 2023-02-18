import {IRole} from "../role";
import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";

export class RoleCreateDto implements IRole {
    roleId: number

    @IsString()
    roleName: string

    @IsInt()
    printid: number

    @IsInt()
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


    constructor() {
        this.roleId = 0;
        this.roleName = "";
        this.printid = 0;
        this.useflag = 1;
        this.useflagDate = null;
        this.creater = "";
        this.createdAt = null;
        this.updater = "";
        this.updatedAt = null;
        this.level1Review = 0;
        this.level1Name = "";
        this.level1Date = null;
        this.level2Review = 0;
        this.level2Name = "";
        this.level2Date = null;
        this.del_uuid = 0;
        this.deleter = "";
        this.deletedAt = null;
    }
}
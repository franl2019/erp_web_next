import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class RoleDeleteDto {
    @IsInt()
    roleId: number

    constructor(roleId: number) {
        this.roleId = roleId;
    }
}
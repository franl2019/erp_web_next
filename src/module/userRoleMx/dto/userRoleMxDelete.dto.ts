import {IUserRoleMx} from "@/module/userRoleMx/userRoleMx";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class UserRoleMxDeleteDto implements IUserRoleMx{

    @IsInt()
    @NotEquals(0)
    roleId: number = 0;

    @IsInt()
    @NotEquals(0)
    userid: number = 0;

    creater: string = "";

    createdAt: Date | null = null;
}
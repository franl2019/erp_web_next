import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {IUserRoleMx} from "@/module/userRoleMx/userRoleMx";

export class UserRoleMxFindDto implements IUserRoleMx {

    @IsInt()
    @NotEquals(0)
    userid: number = 0;

    roleId: number = 0;

    createdAt: Date | null = null;
    creater: string = "";
}
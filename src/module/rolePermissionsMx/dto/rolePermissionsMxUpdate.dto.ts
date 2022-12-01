import {IsInt,IsArray,NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {RolePermissionsMxCreateDto} from "@/module/rolePermissionsMx/dto/rolePermissionsMxCreate.dto";

export class RolePermissionsMxUpdateDto {
    @IsInt()
    @NotEquals(0)
    roleId:number = 0;
    @IsArray()
    rolePermissionsMxList:RolePermissionsMxCreateDto[] = []


    constructor(roleId: number, rolePermissionsMxList: RolePermissionsMxCreateDto[]) {
        this.roleId = roleId;
        this.rolePermissionsMxList = rolePermissionsMxList;
    }
}
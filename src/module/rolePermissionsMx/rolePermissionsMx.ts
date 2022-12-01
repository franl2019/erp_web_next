import {IPermissions} from "@/module/permissions/permissions";

export interface IRolePermissionsMx {
    roleId: number;
    permissionsId: number;
    updater: string;
    updatedAt: Date | null;
}

export enum RolePermissionsCanType  {
    can=1,
    cant=0,
    all=3
}

export interface IRolePermissionsMxJoinPermissions extends IRolePermissionsMx, IPermissions {
    roleId: number;
    permissionsId: number;
    permissionsCode: number;
    permissionsName: string;
    permissionsThemeId: number;
    can:RolePermissionsCanType;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    deleter: string;
    del_uuid: number;
    deletedAt: Date | null;
}
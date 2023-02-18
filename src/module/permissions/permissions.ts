export interface IPermissions {
    permissionsId: number;
    permissionsName: string;
    permissionsCode:string;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
    permissionsThemeId: number;
}
export interface IPermissionsTheme {
    permissionsThemeId:number;
    permissionsThemeName:string;
    printid:number;
    creater:string;
    createdAt:Date | null;
    updater:string;
    updatedAt:Date | null;
    del_uuid:number;
    deleter:string;
    deletedAt:Date | null;
}

export interface IPermissionsThemeTree extends IPermissionsTheme{
    children?:IPermissionsThemeTree[]
}
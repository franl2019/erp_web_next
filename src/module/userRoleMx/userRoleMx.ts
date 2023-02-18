import {IUser} from "@/module/user/user";

export interface IUserRoleMx {
    userid:number;
    roleId:number;
    creater:string;
    createdAt:Date | null;
}

export interface IUserRoleMxJoinUser extends IUserRoleMx, IUser {
}

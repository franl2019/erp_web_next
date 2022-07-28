export interface IUser{
    userid: number;
    usercode: string;
    username: string;
    useflag: number;
    usertype: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
}

export class User implements IUser{
    userid: number = 0;
    usercode: string = "";
    username: string = "";
    useflag: number = 0;
    usertype: number = 0;
    creater: string = "";
    createdAt: Date | null = null;
    updater: string = "";
    updatedAt: Date | null = null;
}
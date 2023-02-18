export interface IUser_operatearea_mx {
    userid: number;
    operateareaid: number;
    operateareaname: string;
    operateareatpye: number;
    userflag: number;
    creater: string | null;
    createdAt: Date | null;
}

export class User_operatearea_mx implements IUser_operatearea_mx {
    userid: number = 0;
    operateareaid: number = 0;
    operateareaname: string = "";
    operateareatpye: number = 0;
    userflag: number = 0;
    creater: string | null = null;
    createdAt: Date | null = null
}
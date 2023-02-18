export interface ICreateUserOperateAreaDto {
    userid: number;
    operateareaid: number | null;
    userflag: number;
}

export class CreateUserOperateAreaDto {
    userid: number = 0;
    operateareaid: number | null = null;
    userflag: number = 0;
}
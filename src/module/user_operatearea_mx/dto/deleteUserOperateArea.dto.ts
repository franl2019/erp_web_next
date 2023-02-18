export interface IDeleteUserOperateAreaDto {
    userid: number;
    operateareaid: number
}

export class DeleteUserOperateAreaDto implements IDeleteUserOperateAreaDto {
    userid: number = 0;
    operateareaid: number = 0;
}
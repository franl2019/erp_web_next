export interface IFindUserOperateAreaDto {
    userid: number;
    operateareatype: number
}

export class FindUserClientOperateAreaDto implements IFindUserOperateAreaDto {
    userid: number = 0;
    operateareatype: number = 0;
}

export class FindUserBuyOperateAreaDto implements IFindUserOperateAreaDto {
    userid: number = 0;
    operateareatype: number = 1;
}
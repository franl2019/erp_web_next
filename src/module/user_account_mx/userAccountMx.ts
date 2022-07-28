export interface IUserAccountMx {
    userid: number;
    accountId: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
}

export interface IUserAccountMxFind extends IUserAccountMx{
    accountName:string;
}
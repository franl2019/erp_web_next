import {IUserAccountMx} from "@/module/user_account_mx/userAccountMx";

export class UserAccountAuthDeleteDto implements IUserAccountMx {
    userid: number = 0;
    accountId: number = 0;
    createdAt: Date | null = null;
    creater: string = "";
    updatedAt: Date | null = null;
    updater: string = "";
}
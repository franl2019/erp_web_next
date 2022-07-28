import {IAccountsPayable} from "@/module/accountsPayable/accountsPayable";

export interface IAccountsPayableFind extends IAccountsPayable{
    buyname: string;
    correlationCode:string;
}
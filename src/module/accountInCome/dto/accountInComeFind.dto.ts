import {IsInt, IsNumber, IsString} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class AccountInComeFindDto {
    @IsInt()
    accountInComeId: number = 0;
    @IsString()
    accountInComeCode: string = "";
    @IsInt()
    accountInComeType: number = 0;
    @IsInt()
    clientid: number = 0;
    //应收账款金额
    @IsNumber()
    amount: number = 0;
    //付款账号
    @IsString()
    paymentAccount: string = "";
    @IsString()
    startDate: string = getStartDate();
    @IsString()
    endDate: string = getEndDate();
    @IsInt()
    page: number = 0;
    @IsInt()
    pagesize: number = 0;
}
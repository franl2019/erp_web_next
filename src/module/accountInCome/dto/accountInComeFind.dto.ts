import {IsInt, IsNumber, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {useGetEndDate, useGetStartDate} from "@/utils";

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
    startDate: string = useGetStartDate();
    @IsString()
    endDate: string = useGetEndDate();
    @IsInt()
    page: number = 0;
    @IsInt()
    pagesize: number = 0;
}
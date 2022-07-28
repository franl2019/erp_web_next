import {IsInt, IsString} from "class-validator";
import {getEndDate, getStartDate} from "@/utils";

export class AccountExpenditureFindDto {
    @IsInt()
    accountExpenditureId: number = 0;
    @IsString()
    accountExpenditureCode: string = '';
    @IsInt()
    accountExpenditureType: number = 0;
    @IsString()
    startDate: string = getStartDate();
    @IsString()
    endDate: string = getEndDate();
    @IsInt()
    buyid: number = 0;
    @IsInt()
    page: number = 0;
    @IsInt()
    pagesize: number = 0;
}
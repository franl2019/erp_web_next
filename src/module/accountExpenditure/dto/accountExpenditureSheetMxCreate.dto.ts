import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {IsInt, IsNumber} from "@/utils/verifyParam/customValidationDecorators";

export interface IAccountExpenditureSheetMxTableData extends IAccountExpenditureSheetMx{
    correlationCode:string
}

export class AccountExpenditureSheetMxCreateDto implements IAccountExpenditureSheetMxTableData{
    @IsInt()
    accountExpenditureSheetMxId:number;
    @IsInt()
    accountExpenditureId:number;
    @IsInt()
    printId:number;
    @IsNumber()
    amounts:number;
    @IsNumber()
    amountsVerified:number;
    @IsNumber()
    amountsNotVerify:number;
    @IsNumber()
    amountsMantissa:number;
    @IsNumber()
    amountsThisVerify:number;
    @IsInt()
    correlationId:number;
    @IsInt()
    correlationType:number;

    correlationCode: string = "";

    constructor(accountExpenditureSheetMx:IAccountExpenditureSheetMx) {
        this.accountExpenditureSheetMxId = accountExpenditureSheetMx.accountExpenditureSheetMxId;
        this.accountExpenditureId = accountExpenditureSheetMx.accountExpenditureId;
        this.printId = accountExpenditureSheetMx.printId;
        this.amounts = accountExpenditureSheetMx.amounts;
        this.amountsVerified = accountExpenditureSheetMx.amountsVerified;
        this.amountsNotVerify = accountExpenditureSheetMx.amountsNotVerify;
        this.amountsMantissa = accountExpenditureSheetMx.amountsMantissa;
        this.amountsThisVerify = accountExpenditureSheetMx.amountsThisVerify;
        this.correlationId = accountExpenditureSheetMx.correlationId;
        this.correlationType = accountExpenditureSheetMx.correlationType;
    }




}
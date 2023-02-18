import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {AccountExpenditureSheetMxFindDto} from "@/module/accountExpenditure/dto/accountExpenditureSheetMxFind.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class AccountExpenditureSheetMxService {

    public async find(accountExpenditure:AccountExpenditureSheetMxFindDto):Promise<IAccountExpenditureSheetMx[]>{
        const accountExpenditureSheetMxFindDto = new AccountExpenditureSheetMxFindDto()
        accountExpenditureSheetMxFindDto.accountExpenditureId = accountExpenditure.accountExpenditureId
        await useVerifyParam(accountExpenditureSheetMxFindDto)
        const result = await useHttpPost<IApiResult<IAccountExpenditureSheetMx>>(API_URL.ACCOUNT_EXPENDITURE_SHEET_MX_FIND,accountExpenditureSheetMxFindDto);
        if(result&&result.code === 200&&result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询采购付款单核销明细失败'))
        }
    }
}
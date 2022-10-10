import {AccountExpenditureAmountMxFindDto} from "@/module/accountExpenditure/dto/accountExpenditureAmountMxFind.dto";
import {useVerifyParam} from "@/utils/validate";
import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {VerifyParamError} from "@/types/error/verifyParamError";

export class AccountExpenditureAmountMxService {

    public async find(accountExpenditure:AccountExpenditureAmountMxFindDto):Promise<IAccountExpenditureAmountMx[]>{
        const accountExpenditureAmountMxFindDto = new AccountExpenditureAmountMxFindDto()
        accountExpenditureAmountMxFindDto.accountExpenditureId = accountExpenditure.accountExpenditureId;
        await useVerifyParam(accountExpenditureAmountMxFindDto)
        const result = await http_post<IApiResult<IAccountExpenditureAmountMx>>(API_URL.ACCOUNT_EXPENDITURE_AMOUNT_MX_FIND,accountExpenditureAmountMxFindDto);
        if(result&&result.code === 200&&result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询采购付款单付款明细失败'))
        }
    }
}
import {AccountsVerifySheetMxFindDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetMxFind.dto";
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IAccountsVerifySheetMxFind} from "@/module/accountsVerifySheet/accountsVerifySheetMx";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
export class AccountsVerifySheetMxService {

    public async find(accountsVerifySheetMxFindDto:AccountsVerifySheetMxFindDto):Promise<IAccountsVerifySheetMxFind[]>{
        await useVerifyParam(accountsVerifySheetMxFindDto)
        const result = await useHttpPost<IApiResult<IAccountsVerifySheetMxFind>>(API_URL.ACCOUNTS_VERIFY_SHEET_MX_FIND,accountsVerifySheetMxFindDto);
        if(result.code === 200&&result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询核销单明细失败'));
        }
    }
}
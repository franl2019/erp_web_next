import {AccountsVerifySheetMxFindDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetMxFind.dto";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IAccountsVerifySheetMxFind} from "@/module/accountsVerifySheet/accountsVerifySheetMx";
import {VerifyParamError} from "@/error/verifyParamError";
import {useVerifyParam} from "@/utils/validate";
export class AccountsVerifySheetMxService {

    public async find(accountsVerifySheetMxFindDto:AccountsVerifySheetMxFindDto):Promise<IAccountsVerifySheetMxFind[]>{
        await useVerifyParam(accountsVerifySheetMxFindDto)
        const result = await http_post<IApiResult<IAccountsVerifySheetMxFind>>(API_URL.ACCOUNTS_VERIFY_SHEET_MX_FIND,accountsVerifySheetMxFindDto);
        if(result.code === 200&&result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询核销单明细失败'));
        }
    }
}
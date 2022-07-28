import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";
import {AccountsPayableFindDto} from "@/module/accountsPayable/dto/accountsPayableFind.dto";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {useVerifyParam} from "@/utils/validate";
import {VerifyParamError} from "@/error/verifyParamError";
export class AccountsPayableService {

    public async find(findDto:AccountsPayableFindDto):Promise<IAccountsPayableFind[]>{
        await useVerifyParam(findDto);
        const result = await http_post<IApiResult<IAccountsPayableFind>>(API_URL.ACCOUNT_PAYABLE_FIND,findDto);
        if(result.code === 200 && result.data){
            return result.data;
        }else{
            return Promise.reject(new VerifyParamError('查询应付账款失败'))
        }
    }
}
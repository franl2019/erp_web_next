import {IAccountsPayableFind} from "@/module/accountsPayable/types/IAccountsPayableFind";
import {AccountsPayableFindDto} from "@/module/accountsPayable/dto/accountsPayableFind.dto";
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class AccountsPayableService {

    public async find(findDto:AccountsPayableFindDto):Promise<IAccountsPayableFind[]>{
        await useVerifyParam(findDto);
        const result = await useHttpPost<IApiResult<IAccountsPayableFind>>(API_URL.ACCOUNT_PAYABLE_FIND,findDto);
        if(result.code === 200 && result.data){
            return result.data;
        }else{
            return Promise.reject(new VerifyParamError('查询应付账款失败'))
        }
    }
}
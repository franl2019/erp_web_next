import {AccountsReceivableFindDto} from "@/module/accountReceivable/dto/accountReceivableFind.dto";
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IAccountsReceivableFind} from "@/module/accountReceivable/accountReceivable";
import {useVerifyParam} from "@/utils/validate";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class AccountReceivableService {

    public async find(accountsReceivableFindDto:AccountsReceivableFindDto):Promise<IAccountsReceivableFind[]>{
        await useVerifyParam(accountsReceivableFindDto);
        const result = await useHttpPost<IApiResult<IAccountsReceivableFind>>(API_URL.ACCOUNT_RECEIVABLE_FIND,accountsReceivableFindDto);
        if(result.code === 200 && result.data){
            return result.data;
        }else{
            return Promise.reject(new VerifyParamError('查询应收账款失败'))
        }
    }
}
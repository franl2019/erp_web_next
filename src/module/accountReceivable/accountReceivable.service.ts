import {AccountsReceivableFindDto} from "@/module/accountReceivable/dto/accountReceivableFind.dto";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IAccountsReceivableFind} from "@/module/accountReceivable/accountReceivable";
import {useVerifyParam} from "@/utils/validate";
import {VerifyParamError} from "@/error/verifyParamError";
export class AccountReceivableService {

    public async find(accountsReceivableFindDto:AccountsReceivableFindDto):Promise<IAccountsReceivableFind[]>{
        await useVerifyParam(accountsReceivableFindDto);
        const result = await http_post<IApiResult<IAccountsReceivableFind>>(API_URL.ACCOUNT_RECEIVABLE_FIND,accountsReceivableFindDto);
        if(result.code === 200 && result.data){
            return result.data;
        }else{
            return Promise.reject(new VerifyParamError('查询应收账款失败'))
        }
    }
}
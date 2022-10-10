import {useVerifyParam} from "@/utils/validate";
import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {AccountInComeAmountMxFindDto} from "@/module/accountInCome/dto/amountMx/accountInComeAmountMxFind.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class AccountInComeAmountMxService {

    public async find(accountInComeAmountMxFindDto: AccountInComeAmountMxFindDto): Promise<IAccountInComeAmountMx[]> {
        await useVerifyParam(accountInComeAmountMxFindDto);
        const result = await http_post<IApiResult<IAccountInComeAmountMx>>(API_URL.ACCOUNT_INCOME_AMOUNT_MX_FIND, accountInComeAmountMxFindDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询出纳收入单收款明细错误"));
        }
    }
}
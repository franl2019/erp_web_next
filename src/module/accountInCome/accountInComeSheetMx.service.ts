import {useVerifyParam} from "@/utils/verifyParam/useVerifyParam";
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";
import {AccountInComeSheetMxFindDto} from "@/module/accountInCome/dto/sheetMx/accountInComeSheetMxFind.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class AccountInComeSheetMxService {

    public async find(accountInComeAmountMxFindDto: AccountInComeSheetMxFindDto): Promise<IAccountInComeSheetMxFind[]> {
        await useVerifyParam(accountInComeAmountMxFindDto);
        const result = await useHttpPost<IApiResult<IAccountInComeSheetMxFind>>(API_URL.ACCOUNT_INCOME_SHEET_MX_FIND, accountInComeAmountMxFindDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询出纳收入单收款明细错误"));
        }
    }
}
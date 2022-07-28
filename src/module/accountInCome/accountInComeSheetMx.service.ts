import {useVerifyParam} from "@/utils/validate";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";
import {AccountInComeSheetMxFindDto} from "@/module/accountInCome/dto/sheetMx/accountInComeSheetMxFind.dto";
import {VerifyParamError} from "@/error/verifyParamError";
export class AccountInComeSheetMxService {

    public async find(accountInComeAmountMxFindDto: AccountInComeSheetMxFindDto): Promise<IAccountInComeSheetMxFind[]> {
        await useVerifyParam(accountInComeAmountMxFindDto);
        const result = await http_post<IApiResult<IAccountInComeSheetMxFind>>(API_URL.ACCOUNT_INCOME_SHEET_MX_FIND, accountInComeAmountMxFindDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询出纳收入单收款明细错误"));
        }
    }
}
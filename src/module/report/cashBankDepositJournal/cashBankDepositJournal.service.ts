import {useHttpPost, IApiResult} from "@/utils/axios";
import {ICashBankDepositJournal} from "@/module/report/cashBankDepositJournal/cashBankDepositJournal";
import {API_URL} from "@/config/apiUrl";
import {CashBankDepositJournalFindDto} from "@/module/report/cashBankDepositJournal/dto/cashBankDepositJournalFind.dto";
import {useVerifyParam} from "@/utils/validate";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class CashBankDepositJournalService {

    public async find(cashBankDepositJournalFindDto:CashBankDepositJournalFindDto):Promise<ICashBankDepositJournal[]> {
        await useVerifyParam(cashBankDepositJournalFindDto);
        const result = await useHttpPost<IApiResult<ICashBankDepositJournal>>(API_URL.CASH_BANK_DEPOSIT_JOURNAL,cashBankDepositJournalFindDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError('查询现金银行存款日记账错误'))
        }
    }
}
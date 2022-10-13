import {AccountExpenditureFindDto} from "@/module/accountExpenditure/dto/accountExpenditureFind.dto";
import {IAccountExpenditureFind} from "@/module/accountExpenditure/accountExpenditure";
import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {AccountExpenditureCreateDto} from "@/module/accountExpenditure/dto/accountExpenditureCreate.dto";
import {AccountExpenditureUpdateDto} from "@/module/accountExpenditure/dto/accountExpenditureUpdate.dto";
import {AccountExpenditureDeleteDto} from "@/module/accountExpenditure/dto/accountExpenditureDelete.dto";
import {AccountExpenditureL1ReviewDto} from "@/module/accountExpenditure/dto/accountExpenditureL1Review.dto";
import {useVerifyParam} from "@/utils/validate";
import {IAccountExpenditureSheetMx} from "@/module/accountExpenditure/types/IAccountExpenditureSheetMx";
import {IAccountExpenditureAmountMx} from "@/module/accountExpenditure/types/IAccountExpenditureAmountMx";
import {
    AccountExpenditureAmountMxCreateDto
} from "@/module/accountExpenditure/dto/accountExpenditureAmountMxCreate.dto";
import {AccountExpenditureSheetMxCreateDto} from "@/module/accountExpenditure/dto/accountExpenditureSheetMxCreate.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";

export class AccountExpenditureService {

    public async find(accountExpenditureFindDto: AccountExpenditureFindDto): Promise<IAccountExpenditureFind[]> {
        await useVerifyParam(accountExpenditureFindDto);
        const result = await useHttpPost<IApiResult<IAccountExpenditureFind>>(API_URL.ACCOUNT_EXPENDITURE_FIND, accountExpenditureFindDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询出纳支出单错误"))
        }
    }

    public async findAccountExpenditureState(accountExpenditureFindDto: AccountExpenditureFindDto){
        await useVerifyParam(accountExpenditureFindDto);
        const result = await useHttpPost<IApiResult<IAccountExpenditureFind>>(API_URL.ACCOUNT_EXPENDITURE_FIND_STATE, accountExpenditureFindDto);

        if (result.code === 200 && result.sheetCompleteState) {
            return result.sheetCompleteState
        } else {
            return Promise.reject(new VerifyParamError("查询出纳支出单状态错误"))
        }
    }

    public async create(accountExpenditureCreateDto: AccountExpenditureCreateDto) {
        await useVerifyParam(accountExpenditureCreateDto);
        await AccountExpenditureService.validationParameters(accountExpenditureCreateDto.accountExpenditureAmountMx, accountExpenditureCreateDto.accountExpenditureSheetMx);
        const result = await useHttpPost<IApiResult>(API_URL.ACCOUNT_EXPENDITURE_CREATE, accountExpenditureCreateDto)
        if (result.code === 200 && result.createResult) {
            return result.createResult
        } else {
            return Promise.reject(new VerifyParamError("新增出纳支出单错误"))
        }
    }

    public async create_l1Review(accountExpenditureCreateDto: AccountExpenditureCreateDto) {
        await useVerifyParam(accountExpenditureCreateDto);
        await AccountExpenditureService.validationParameters(accountExpenditureCreateDto.accountExpenditureAmountMx, accountExpenditureCreateDto.accountExpenditureSheetMx);
        const result = await useHttpPost<IApiResult>(API_URL.ACCOUNT_EXPENDITURE_CREATE_L1REVIEW, accountExpenditureCreateDto)
        if (result.code === 200 && result.createResult) {
            return result.createResult
        } else {
            return Promise.reject(new VerifyParamError("新增并审核出纳支出单错误"))
        }
    }

    public async update(accountExpenditureUpdateDto: AccountExpenditureUpdateDto) {
        await useVerifyParam(accountExpenditureUpdateDto);
        await AccountExpenditureService.validationParameters(accountExpenditureUpdateDto.accountExpenditureAmountMx, accountExpenditureUpdateDto.accountExpenditureSheetMx);
        const result = await useHttpPost<IApiResult>(API_URL.ACCOUNT_EXPENDITURE_UPDATE, accountExpenditureUpdateDto)
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("更新出纳支出单错误"))
        }
    }

    public async update_l1Review(accountExpenditureUpdateDto: AccountExpenditureUpdateDto) {
        await useVerifyParam(accountExpenditureUpdateDto);
        await AccountExpenditureService.validationParameters(accountExpenditureUpdateDto.accountExpenditureAmountMx, accountExpenditureUpdateDto.accountExpenditureSheetMx);
        const result = await useHttpPost<IApiResult>(API_URL.ACCOUNT_EXPENDITURE_UPDATE_L1REVIEW, accountExpenditureUpdateDto)
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("更新加审核出纳支出单错误"))
        }
    }

    public async delete_data(accountExpenditureDeleteDto: AccountExpenditureDeleteDto) {
        await useVerifyParam(accountExpenditureDeleteDto);
        const result = await useHttpPost<IApiResult>(API_URL.ACCOUNT_EXPENDITURE_DELETE, accountExpenditureDeleteDto)
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("删除出纳支出单错误"))
        }
    }

    public async level1Review(accountExpenditureL1ReviewDto: AccountExpenditureL1ReviewDto) {
        await useVerifyParam(accountExpenditureL1ReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.ACCOUNT_EXPENDITURE_L1REVIEW, accountExpenditureL1ReviewDto)
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("审核出纳支出单错误"))
        }
    }

    public async unLevel1Review(accountExpenditureL1ReviewDto: AccountExpenditureL1ReviewDto) {
        await useVerifyParam(accountExpenditureL1ReviewDto);
        const result = await useHttpPost<IApiResult>(API_URL.ACCOUNT_EXPENDITURE_UN_L1REVIEW, accountExpenditureL1ReviewDto)
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new VerifyParamError("撤审出纳支出单错误"))
        }
    }

    private static async validationParameters(accountExpenditureAmountMxList: IAccountExpenditureAmountMx[], accountExpenditureSheetMxList: IAccountExpenditureSheetMx[]) {
        for (let i = 0; i < accountExpenditureAmountMxList.length; i++) {
            const accountExpenditureAmountMx = new AccountExpenditureAmountMxCreateDto(accountExpenditureAmountMxList[i]);
            await useVerifyParam(accountExpenditureAmountMx);
        }

        for (let i = 0; i < accountExpenditureSheetMxList.length; i++) {
            const accountExpenditureSheetMx = new AccountExpenditureSheetMxCreateDto(accountExpenditureSheetMxList[i]);
            await useVerifyParam(accountExpenditureSheetMx);
        }
    }
}
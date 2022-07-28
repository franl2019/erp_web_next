import {AccountInComeFindDto} from "@/module/accountInCome/dto/accountInComeFind.dto";
import {useVerifyParam} from "@/utils/validate";
import {http_post, IApiResult} from "@/api/axios";
import {IAccountInComeFind} from "@/module/accountInCome/accountInCome";
import {API_URL} from "@/api/url";
import {AccountInComeCreateDto} from "@/module/accountInCome/dto/accountInComeCreate.dto";
import {AccountInComeUpdateDto} from "@/module/accountInCome/dto/accountInComeUpdate.dto";
import {AccountInComeDeleteDto} from "@/module/accountInCome/dto/accountInComeDelete.dto";
import {AccountInComeL1ReviewDto} from "@/module/accountInCome/dto/accountInComeL1Review.dto";
import {IAccountInComeAmountMx} from "@/module/accountInCome/accountInComeAmountMx";
import {IAccountInComeSheetMxFind} from "@/module/accountInCome/accountInComeSheetMx";
import {AccountInComeAmountMxCreateDto} from "@/module/accountInCome/dto/amountMx/accountInComeAmountMxCreate.dto";
import {AccountInComeSheetMxCreateDto} from "@/module/accountInCome/dto/sheetMx/accountInComeSheetMxCreate.dto";
import {VerifyParamError} from "@/error/verifyParamError";
import {IAccountInComeSheetState} from "@/view/home/saleHome.vue";

export class AccountInComeService {

    private static async validationParameters(accountInComeAmountMxList: IAccountInComeAmountMx[], accountInComeSheetMxList: IAccountInComeSheetMxFind[]) {
        for (let i = 0; i < accountInComeAmountMxList.length; i++) {
            const accountInComeAmountMx = new AccountInComeAmountMxCreateDto(accountInComeAmountMxList[i]);
            await useVerifyParam(accountInComeAmountMx);
        }

        for (let i = 0; i < accountInComeSheetMxList.length; i++) {
            const accountInComeSheetMx = new AccountInComeSheetMxCreateDto(accountInComeSheetMxList[i]);
            await useVerifyParam(accountInComeSheetMx);
        }
    }

    public async find(accountInComeFindDto: AccountInComeFindDto): Promise<IAccountInComeFind[]> {
        await useVerifyParam(accountInComeFindDto);
        const result = await http_post<IApiResult<IAccountInComeFind>>(API_URL.ACCOUNT_INCOME_FIND, accountInComeFindDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询出纳收入单错误"));
        }
    }

    public async findSheetState(accountInComeFindDto: AccountInComeFindDto) {
        await useVerifyParam(accountInComeFindDto);
        const result = await http_post<IApiResult<IAccountInComeSheetState>>(API_URL.ACCOUNT_INCOME_FIND_SHEET_STATE, accountInComeFindDto);
        if (result.code === 200 && result.sheetCompleteState) {
            return result.sheetCompleteState;
        } else {
            return Promise.reject(new VerifyParamError("查询出纳收入单错误"));
        }
    }

    public async create(accountInComeCreateDto: AccountInComeCreateDto) {
        await useVerifyParam(accountInComeCreateDto);
        await AccountInComeService.validationParameters(accountInComeCreateDto.accountInComeAmountMx, accountInComeCreateDto.accountInComeSheetMx);
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_INCOME_CREATE, accountInComeCreateDto);
        if (result.code === 200 && result.createResult) {
            return result.createResult;
        } else {
            return Promise.reject(new VerifyParamError("保存出纳收入单错误"));
        }
    }

    public async create_l1Review(accountInComeCreateDto: AccountInComeCreateDto) {
        await useVerifyParam(accountInComeCreateDto);
        await AccountInComeService.validationParameters(accountInComeCreateDto.accountInComeAmountMx, accountInComeCreateDto.accountInComeSheetMx);
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_INCOME_CREATE_L1REVIEW, accountInComeCreateDto);
        if (result.code === 200 && result.createResult) {
            return result.createResult;
        } else {
            return Promise.reject(new VerifyParamError("保存并审核出纳收入单错误"));
        }
    }

    public async update(accountInComeUpdateDto: AccountInComeUpdateDto) {
        await useVerifyParam(accountInComeUpdateDto);
        await AccountInComeService.validationParameters(accountInComeUpdateDto.accountInComeAmountMx, accountInComeUpdateDto.accountInComeSheetMx)
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_INCOME_UPDATE, accountInComeUpdateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新出纳收入单错误"));
        }
    }

    public async update_l1Review(accountInComeUpdateDto: AccountInComeUpdateDto) {
        await useVerifyParam(accountInComeUpdateDto);
        await AccountInComeService.validationParameters(accountInComeUpdateDto.accountInComeAmountMx, accountInComeUpdateDto.accountInComeSheetMx)
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_INCOME_UPDATE_L1REVIEW, accountInComeUpdateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新加审核出纳收入单错误"));
        }
    }

    public async delete_data(accountInComeDeleteDto: AccountInComeDeleteDto) {
        await useVerifyParam(accountInComeDeleteDto);
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_INCOME_DELETE, accountInComeDeleteDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除出纳收入单错误"));
        }
    }

    public async level1Review(accountInComeL1ReviewDto: AccountInComeL1ReviewDto) {
        await useVerifyParam(accountInComeL1ReviewDto);
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_INCOME_L1REVIEW, accountInComeL1ReviewDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("审核出纳收入单错误"));
        }
    }

    public async unLevel1Review(accountInComeL1ReviewDto: AccountInComeL1ReviewDto) {
        await useVerifyParam(accountInComeL1ReviewDto);
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_INCOME_UN_L1REVIEW, accountInComeL1ReviewDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("撤审出纳收入单错误"));
        }
    }
}
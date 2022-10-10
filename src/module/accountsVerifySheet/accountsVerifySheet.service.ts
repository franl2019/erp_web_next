import {IAccountsVerifySheetFind} from "@/module/accountsVerifySheet/accountsVerifySheet";
import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {AccountsVerifySheetFindDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetFind.dto";
import {AccountsVerifySheetCreateDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetCreate.dto";
import {useVerifyParam} from "@/utils/validate";
import {AccountsVerifySheetMxCreateDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetMxCreate.dto";
import {AccountsVerifySheetUpdateDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetUpdate.dto";
import {AccountsVerifySheetDeleteDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetDelete.dto";
import {AccountsVerifySheetReviewDto} from "@/module/accountsVerifySheet/dto/accountsVerifySheetReview.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";


export class AccountsVerifySheetService {

    public async find(findDto: AccountsVerifySheetFindDto): Promise<IAccountsVerifySheetFind[]> {
        await useVerifyParam(findDto);
        const result = await http_post<IApiResult<IAccountsVerifySheetFind>>(API_URL.ACCOUNTS_VERIFY_SHEET_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError('查询核销单头失败'))
        }
    }

    public async findAccountVerifySheetState(findDto: AccountsVerifySheetFindDto){
        await useVerifyParam(findDto);
        const result = await http_post<IApiResult<IAccountsVerifySheetFind>>(API_URL.ACCOUNTS_VERIFY_SHEET_FIND_STATE, findDto);
        if (result.code === 200 && result.sheetCompleteState) {
            return result.sheetCompleteState
        } else {
            return Promise.reject(new VerifyParamError('查询核销单状态失败'))
        }
    }

    public async findOne(accountsVerifySheetId: number): Promise<IAccountsVerifySheetFind> {
        const findDto = {
            accountsVerifySheetCode: "",
            accountsVerifySheetId: accountsVerifySheetId,
            buyid: 0,
            buyid_b: 0,
            clientid: 0,
            clientid_b: 0,
            endDate: "",
            level1Review: 0,
            level2Review: 0,
            page: 0,
            pagesize: 0,
            sheetType: 0,
            startDate: ""
        }
        await useVerifyParam(findDto);
        const accountsVerifySheetFinds = await this.find(findDto);
        if (accountsVerifySheetFinds && accountsVerifySheetFinds.length > 0) {
            return accountsVerifySheetFinds[0]
        } else {
            return Promise.reject(new VerifyParamError('按单号查询核销单头失败'))
        }
    }

    public async create(createDto: AccountsVerifySheetCreateDto) {
        await useVerifyParam(createDto);
        for (let i = 0; i < createDto.accountsVerifySheetMx.length; i++) {
            const accountsVerifySheetMxCreateDto = new AccountsVerifySheetMxCreateDto(createDto.accountsVerifySheetMx[i]);
            await useVerifyParam(accountsVerifySheetMxCreateDto);
        }
        const result = await http_post<IApiResult>(API_URL.ACCOUNTS_VERIFY_SHEET_CREATE, createDto);
        if (result.code === 200) {
            return result.createResult
        } else {
            return Promise.reject(new VerifyParamError('保存核销单头失败'));
        }
    }

    public async create_l1Review(createDto: AccountsVerifySheetCreateDto) {
        await useVerifyParam(createDto);
        for (let i = 0; i < createDto.accountsVerifySheetMx.length; i++) {
            const accountsVerifySheetMxCreateDto = new AccountsVerifySheetMxCreateDto(createDto.accountsVerifySheetMx[i]);
            await useVerifyParam(accountsVerifySheetMxCreateDto);
        }
        const result = await http_post<IApiResult>(API_URL.ACCOUNTS_VERIFY_SHEET_CREATE_L1REVIEW, createDto);
        if (result.code === 200 && result.createResult) {
            return result.createResult
        } else {
            return Promise.reject(new VerifyParamError('保存并审核核销单头失败'));
        }
    }

    public async update(updateDto: AccountsVerifySheetUpdateDto) {
        await useVerifyParam(updateDto);
        for (let i = 0; i < updateDto.accountsVerifySheetMx.length; i++) {
            const accountsVerifySheetMxCreateDto = new AccountsVerifySheetMxCreateDto(updateDto.accountsVerifySheetMx[i]);
            await useVerifyParam(accountsVerifySheetMxCreateDto);
        }
        const result = await http_post<IApiResult>(API_URL.ACCOUNTS_VERIFY_SHEET_UPDATE, updateDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError('更新核销单头失败'));
        }
    }

    public async update_l1Review(updateDto: AccountsVerifySheetUpdateDto) {
        await useVerifyParam(updateDto);
        for (let i = 0; i < updateDto.accountsVerifySheetMx.length; i++) {
            const accountsVerifySheetMxCreateDto = new AccountsVerifySheetMxCreateDto(updateDto.accountsVerifySheetMx[i]);
            await useVerifyParam(accountsVerifySheetMxCreateDto);
        }
        const result = await http_post<IApiResult>(API_URL.ACCOUNTS_VERIFY_SHEET_UPDATE_L1REVIEW, updateDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError('更新加审核,核销单头失败'));
        }
    }

    public async delete_data(deleteDto: AccountsVerifySheetDeleteDto) {
        await useVerifyParam(deleteDto);
        const result = await http_post<IApiResult>(API_URL.ACCOUNTS_VERIFY_SHEET_DELETE, deleteDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError('删除核销单头失败'));
        }
    }

    public async L1Review(reviewDto: AccountsVerifySheetReviewDto) {
        await useVerifyParam(reviewDto);
        const result = await http_post<IApiResult>(API_URL.ACCOUNTS_VERIFY_SHEET_L1REVIEW, reviewDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError('审核核销单头失败'));
        }
    }

    public async unL1Review(reviewDto: AccountsVerifySheetReviewDto) {
        await useVerifyParam(reviewDto);
        const result = await http_post<IApiResult>(API_URL.ACCOUNTS_VERIFY_SHEET_UNL1REVIEW, reviewDto);
        if (result.code === 200) {
            return result
        } else {
            return Promise.reject(new VerifyParamError('撤审核销单头失败'));
        }
    }
}
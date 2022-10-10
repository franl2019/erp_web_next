import {FindAccountDto} from "@/module/account/dto/accountFind.dto";
import {http_post, IApiResult} from "@/utils/axios";
import {IAccount} from "@/module/account/account";
import {API_URL} from "@/config/apiUrl";
import {AccountEditDto} from "@/module/account/dto/accountEdit.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";

export class AccountService {

    public async find(findDto: FindAccountDto) {
        const result = await http_post<IApiResult<IAccount>>(API_URL.ACCOUNT_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询出纳账户失败"))
        }
    }

    public async findAuth() {
        const result = await http_post<IApiResult<IAccount>>(API_URL.ACCOUNT_AUTH_FIND);
        if (result.code === 200 && result.data) {
            return result.data;
        } else {
            return Promise.reject(new VerifyParamError("查询出纳账户权限失败"))
        }
    }

    public async create(createDto: AccountEditDto) {
        if (createDto.accountName.length === 0) {
            return Promise.reject(new VerifyParamError('请输入出纳账户名称'))
        }

        if (createDto.accountCode.length === 0) {
            return Promise.reject(new VerifyParamError('请输入出纳账户编号'))
        }

        if (createDto.currencyid === 0) {
            return Promise.reject(new VerifyParamError('请选择币种'))
        }
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_CREATE, createDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("新增出纳账户失败"))
        }
    }

    public async update(updateDto: AccountEditDto) {
        if (updateDto.accountName.length === 0) {
            return Promise.reject(new VerifyParamError('请输入出纳账户名称'))
        }

        if (updateDto.accountCode.length === 0) {
            return Promise.reject(new VerifyParamError('请输入出纳账户编号'))
        }

        if (updateDto.currencyid === 0) {
            return Promise.reject(new VerifyParamError('请选择币种'))
        }
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_UPDATE, updateDto);
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("更新出纳账户失败"))
        }
    }

    public async delete_data(accountId: number) {
        const result = await http_post<IApiResult>(API_URL.ACCOUNT_DELETE, {accountId: accountId});
        if (result.code === 200) {
            return true;
        } else {
            return Promise.reject(new VerifyParamError("删除出纳账户失败"))
        }
    }
}
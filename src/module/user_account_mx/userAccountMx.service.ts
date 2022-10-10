import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IUserAccountMx} from "@/module/user_account_mx/userAccountMx";
import {UserAccountAuthFindDto} from "@/module/user_account_mx/dto/userAccountAuthFind.dto";
import {useVerifyParam} from "@/utils/validate";
import {UserAccountAuthCreateDto} from "@/module/user_account_mx/dto/userAccountAuthCreate.dto";
import {UserAccountAuthDeleteDto} from "@/module/user_account_mx/dto/userAccountAuthDeleteDto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class UserAccountMxService {

    public async find(findDto:UserAccountAuthFindDto) {
        const userAccountAuthFindDto = new UserAccountAuthFindDto();
        userAccountAuthFindDto.accountId = findDto.accountId;
        userAccountAuthFindDto.userid = findDto.userid;
        await useVerifyParam(userAccountAuthFindDto);
        const result = await http_post<IApiResult<IUserAccountMx>>(API_URL.USER_ACCOUNT_MX_FIND, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查询用户出纳账户权限明细错误"));
        }
    }

    public async create(createDto:UserAccountAuthCreateDto){
        const result = await http_post<IApiResult>(API_URL.USER_ACCOUNT_MX_CREATE, createDto);
        if (result.code === 200) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("新增用户出纳账户权限明细错误"));
        }
    }

    public async delete_data(deleteDto:UserAccountAuthDeleteDto){
        const result = await http_post<IApiResult>(API_URL.USER_ACCOUNT_MX_DELETE,deleteDto);
        if (result.code === 200) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("删除用户出纳账户权限明细错误"));
        }
    }
}
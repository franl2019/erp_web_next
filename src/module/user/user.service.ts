import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IUser} from "@/module/user/user";
import {VerifyParamError} from "@/error/verifyParamError";
export class UserService {
    public async find() {
        const result = await http_post<IApiResult<IUser>>(API_URL.USER_SELECT);
        if (result.code === 200 && result.data) {
            return result.data;
        }else{
            return Promise.reject(new VerifyParamError("查询用户资料失败"))
        }
    }
}
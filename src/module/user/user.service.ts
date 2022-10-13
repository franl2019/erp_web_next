import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IUser} from "@/module/user/user";
import {VerifyParamError} from "@/types/error/verifyParamError";
export class UserService {
    public async find() {
        const result = await useHttpPost<IApiResult<IUser>>(API_URL.USER_SELECT);
        if (result.code === 200 && result.data) {
            return result.data;
        }else{
            return Promise.reject(new VerifyParamError("查询用户资料失败"))
        }
    }
}
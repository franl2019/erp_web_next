import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {useLocalStorageSave} from "@/utils";
import {VerifyParamError} from "@/types/error/verifyParamError";

export interface IAuth {
    usercode:string,
    password:string
}

export class Auth {
    usercode: string
    password: string

    constructor(auth:IAuth) {
        this.usercode = auth.usercode;
        this.password = auth.password;
    }

    public async login() {
        const result = await http_post<IApiResult>(API_URL.USER_LOGIN, {
            usercode: this.usercode,
            password: this.password
        })
        if (result.code === 200) {
            useLocalStorageSave("token", result.token!);
        } else {
           return Promise.reject(new VerifyParamError(result.msg))
        }
    }
}
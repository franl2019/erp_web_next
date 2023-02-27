import axios, {AxiosRequestTransformer, AxiosResponse} from 'axios';
import {useLocalStorageGet} from '@/utils/index';
import {isLoading} from "@/components/loading/loading";
import useErpDialog from "@/components/dialog/useErpDialog";
import {ElMessage} from "element-plus";
import {HttpError} from "@/types/error/httpError";
import {config} from "@/config/env";
import {BASE_PATH} from "@/config/apiUrl";

export interface sheetCompleteState{
    completeL1Review: number;
    undoneL1Review: number;
    undoneL2Review: number;
}

export interface IApiResult<T = any> {
    code: number;
    msg: string;
    data: T[];
    token?: string;
    createResult?: {
        id: number,
        code: string;
    },
    sheetCompleteState?: sheetCompleteState,
    related?: any
}

//axios实例
const axiosInstance = axios.create({
    baseURL: config.isDev ? "" : config.serviceUrl,
    timeout: 12000
})

const notTokenUrls = [
    "/users/login",
    "/users/register"
]
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
    isLoading.value = true
    if (notTokenUrls.indexOf(<string>config.url) !== -1) {
        return config;
    } else {
        const token = useLocalStorageGet('token')
        config.headers = {
            'token': token
        }
        return config
    }
});

//post请求
export function useHttpPost<T>(url: string, params?: any): Promise<T> {
    return new Promise((resolve, reject) => {
        url = BASE_PATH + url;
        axiosInstance.post(url, params).then((result: AxiosResponse<T>) => {
            if (result) {
                resolve(result.data);
            } else {
                reject(new HttpError('请求错误'))
            }
            isLoading.value = false;
        }).catch((error) => {
            isLoading.value = false;
            if (error.response) {
                // 请求后端有响应状态码
                // 超出2xx
                useErpDialog({
                    title: '错误提示',
                    message: `${error.response.data.msg || '请求错误'}`,
                    closeBtnVisible: false
                })
            } else if (error.request) {
                ElMessage({
                    message: '请求超时,请联系管理员',
                    type: 'error'
                })
            } else {
                // Something happened in setting up the request that triggered an Error
                useErpDialog({
                    title: '错误提示',
                    message: error.message,
                    closeBtnVisible: false
                })
            }
            reject(error)
        });
    })
}





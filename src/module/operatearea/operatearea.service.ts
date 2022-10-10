import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {FindOperateareaDto} from "@/module/operatearea/dto/findOperatearea.dto";
import {VerifyParamError} from "@/types/error/verifyParamError";
export interface IOperatearea {
    operateareaid: number;
    operateareaname: string;
    operateareatype: number;
    useflag: number;
    creater: string;
    createdAt: Date | null;
    updater: string;
    updatedAt: Date | null;
    del_uuid: number;
    deletedAt: Date | null;
    deleter: string;
}

export class OperateareaService {

    public async findAll(finDto: FindOperateareaDto) {
        const result = await http_post<IApiResult<IOperatearea>>(API_URL.OPERATEAREA_SELECT, finDto);
        if (result.code === 200 && result.data) {
            return result.data
        } else {
            return Promise.reject(new VerifyParamError("查找操作区域失败"));
        }
    }

    public async findDefault(finDto: FindOperateareaDto):Promise<IOperatearea> {
        const result = await http_post<IApiResult<IOperatearea>>(API_URL.OPERATEAREA_FIND_DEFAULT, finDto);
        if (result.code === 200 && result.data&&result.data.length>0) {
            return result.data[0]
        } else {
            return Promise.reject(new VerifyParamError("查找默认操作区域失败"));
        }
    }
}
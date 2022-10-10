import {
    AccountReceivableMxReportFindDto
} from "@/module/report/accountReceivableMxReport/dto/accountReceivableMxReportFind.dto";
import {http_post, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {IAccountReceivableMxReport} from "@/module/report/accountReceivableMxReport/accountReceivableMxReport";
import {VerifyParamError} from "@/types/error/verifyParamError";

export class AccountReceivableMxReportService {

    public async find(findDto:AccountReceivableMxReportFindDto):Promise<IAccountReceivableMxReport[]>{
        const result = await http_post<IApiResult<IAccountReceivableMxReport>>(API_URL.ACCOUNT_RECEIVABLE_MX_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询失败'))
        }
    }
}
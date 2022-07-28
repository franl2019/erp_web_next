import {
    AccountReceivableMxReportFindDto
} from "@/module/report/accountReceivableMxReport/dto/accountReceivableMxReportFind.dto";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IAccountReceivableMxReport} from "@/module/report/accountReceivableMxReport/accountReceivableMxReport";
import {VerifyParamError} from "@/error/verifyParamError";

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
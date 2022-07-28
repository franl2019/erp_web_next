import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {
    AccountPayableMxReportFindDto
} from "@/module/report/accountPayableMxReport/dto/accountPayableMxReportFind.dto";
import {IAccountPayableMxReport} from "@/module/report/accountPayableMxReport/accountPayableMxReport";
import {VerifyParamError} from "@/error/verifyParamError";
export class AccountPayableMxReportService {

    public async find(findDto:AccountPayableMxReportFindDto):Promise<IAccountPayableMxReport[]>{
        const result = await http_post<IApiResult<IAccountPayableMxReport>>(API_URL.ACCOUNT_PAYABLE_MX_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询失败'))
        }
    }
}
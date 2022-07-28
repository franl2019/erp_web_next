import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {VerifyParamError} from "@/error/verifyParamError";
import {IAccountPayableSumReport} from "@/module/report/accountPayableSumReport/accountPayableSumReport";
import {
    AccountPayableSumReportFindDto
} from "@/module/report/accountPayableSumReport/dto/accountPayableSumReportFind.dto";


export class AccountPayableSumReportService {

    public async find(findDto:AccountPayableSumReportFindDto):Promise<IAccountPayableSumReport[]>{
        const result = await http_post<IApiResult<IAccountPayableSumReport>>(API_URL.ACCOUNT_PAYABLE_SUM_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询失败'))
        }
    }
}
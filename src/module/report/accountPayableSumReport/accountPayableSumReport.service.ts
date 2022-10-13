import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {IAccountPayableSumReport} from "@/module/report/accountPayableSumReport/accountPayableSumReport";
import {
    AccountPayableSumReportFindDto
} from "@/module/report/accountPayableSumReport/dto/accountPayableSumReportFind.dto";


export class AccountPayableSumReportService {

    public async find(findDto:AccountPayableSumReportFindDto):Promise<IAccountPayableSumReport[]>{
        const result = await useHttpPost<IApiResult<IAccountPayableSumReport>>(API_URL.ACCOUNT_PAYABLE_SUM_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询失败'))
        }
    }
}
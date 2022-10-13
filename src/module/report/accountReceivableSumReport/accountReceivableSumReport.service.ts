import {useHttpPost, IApiResult} from "@/utils/axios";
import {API_URL} from "@/config/apiUrl";
import {VerifyParamError} from "@/types/error/verifyParamError";
import {
    AccountReceivableSumReportFindDto
} from "@/module/report/accountReceivableSumReport/dto/accountReceivableSumReportFind.dto";
import {IAccountReceivableSumReport} from "@/module/report/accountReceivableSumReport/accountReceivableSumReport";

export class AccountReceivableSumReportService {

    public async find(findDto:AccountReceivableSumReportFindDto):Promise<IAccountReceivableSumReport[]>{
        const result = await useHttpPost<IApiResult<IAccountReceivableSumReport>>(API_URL.ACCOUNT_RECEIVABLE_SUM_REPORT,findDto);
        if(result.code === 200 && result.data){
            return result.data
        }else{
            return Promise.reject(new VerifyParamError('查询失败'))
        }
    }
}
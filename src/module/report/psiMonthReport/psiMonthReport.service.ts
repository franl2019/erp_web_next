import {PsiMonthReportFindDto} from "@/module/report/psiMonthReport/dto/psiMonthReportFind.dto";
import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import {IPsiMonthReport} from "@/module/report/psiMonthReport/psiMonthReport";

export class PsiMonthReportService {

    public async find(findDto: PsiMonthReportFindDto) {
        const result = await http_post<IApiResult<IPsiMonthReport>>(API_URL.PSI_MONTH_REPORT, findDto);
        if (result.code === 200 && result.data) {
            return result.data
        }else{
            return Promise.reject(new Error('查询进销存月报表失败'))
        }
    }
}
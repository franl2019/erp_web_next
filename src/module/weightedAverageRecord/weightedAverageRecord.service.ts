import {http_post, IApiResult} from "@/api/axios";
import {API_URL} from "@/api/url";
import ErpDialog from "@/components/dialog/dialog";
import {CountWeightedAverageRecordMxDto} from "@/module/weightedAverageRecord/dto/countWeightedAverageRecordMx.dto";
import {useVerifyParam} from "@/utils/validate";
import {WeightedAverageRecordL1ReviewDto} from "@/module/weightedAverageRecord/dto/weightedAverageRecordL1Review.dto";

export class WeightedAverageRecordService {

    public async checkIfCountIsRequired(inDate: string,callback:()=>Promise<any>) {
        const result = await http_post<IApiResult>(API_URL.WEIGHTED_AVERAGE_RECORD_CHECK_IF_COUNT_IS_REQUIRED);
        if (result.code === 200 && result.related) {
            if (result.related.isRequired) {
                ErpDialog({
                    title: "提示",
                    message: "有新业务发生，即将进行成本核算，是否继续?",
                    ok: () => {
                        this.countWeightedAverageRecordMx(inDate).then(()=>{
                            callback();
                        });
                    }
                })
                return true
            }else{
                return false
            }
        }
    }

    public async countWeightedAverageRecordMx(inDate: string) {
        const countWeightedAverageRecordMxDto = new CountWeightedAverageRecordMxDto()
        countWeightedAverageRecordMxDto.inDate = inDate;
        await useVerifyParam(countWeightedAverageRecordMxDto);
        const result = await http_post<IApiResult>(API_URL.WEIGHTED_AVERAGE_RECORD_COUNT_MX,countWeightedAverageRecordMxDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error('核算成本失败'))
        }
    }

    public async l1Review(inDate: string) {
        const weightedAverageRecordL1ReviewDto = new WeightedAverageRecordL1ReviewDto()
        weightedAverageRecordL1ReviewDto.inDate = inDate;
        await useVerifyParam(weightedAverageRecordL1ReviewDto);
        const result = await http_post<IApiResult>(API_URL.WEIGHTED_AVERAGE_RECORD_L1REVIEW,weightedAverageRecordL1ReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error('结转成本失败'))
        }
    }

    public async unl1Review(inDate: string) {
        const weightedAverageRecordL1ReviewDto = new WeightedAverageRecordL1ReviewDto()
        weightedAverageRecordL1ReviewDto.inDate = inDate;
        await useVerifyParam(weightedAverageRecordL1ReviewDto);
        const result = await http_post<IApiResult>(API_URL.WEIGHTED_AVERAGE_RECORD_UNL1REVIEW,weightedAverageRecordL1ReviewDto);
        if (result.code === 200) {
            return true
        } else {
            return Promise.reject(new Error('取消结转成本失败'))
        }
    }
}
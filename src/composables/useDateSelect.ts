import {computed, Ref} from "vue";
import moment from "moment";

export function useDateSelect(findDto:Ref<{startDate:string,endDate:string}>) {
    //设置默认日期
    const findDate = computed({
        get: () => {
            return [findDto.value.startDate, findDto.value.endDate]
        },
        set: async (val) => {
            if (val) {
                findDto.value.startDate = val[0];
                findDto.value.endDate = val[1];
            } else {
                findDto.value.startDate = moment().startOf("month").format('YYYY-MM-DD HH:mm:ss');
                findDto.value.endDate = moment().endOf("month").format('YYYY-MM-DD HH:mm:ss');
            }
        }
    })

    return{
        findDate
    }
}
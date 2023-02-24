import {ButtonState} from "@/composables/ButtonState";
import {ref} from "vue";
import {
    ISaleOutboundFindDataDto,
    SaleOutboundFindDataDto
} from "@/module/saleOutbound/dto/outbound/saleOutboundFindData.dto";
import {ISaleOutboundMxFindDto, SaleOutboundMxFindDto} from "@/module/saleOutbound/dto/mx/saleOutboundMxFind.dto";

export function useSaleOutboundFind() {

    //按钮可视状态
    const buttonState = ref(new ButtonState());
    //销售单查询页单头查询请求参数
    const saleOutboundHeadFindDto = ref<ISaleOutboundFindDataDto>(new SaleOutboundFindDataDto());
    //销售单查询页明细查询请求参数
    const saleOutboundMxFindDto = ref<ISaleOutboundMxFindDto>(new SaleOutboundMxFindDto());

    return {
        buttonState,
        saleOutboundHeadFindDto,
        saleOutboundMxFindDto
    }
}
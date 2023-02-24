import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {SaleOrderMxCreateDto} from "@/module/saleOrder/dto/mx/saleOrderMxCreate.dto";

export class SaleOrderMxUpdateDto extends SaleOrderMxCreateDto{
    //销售订单头id
    @IsInt()
    @NotEquals(0)
    saleOrderId: number = 0;

    constructor() {
        super()
    }
}
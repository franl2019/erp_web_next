import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {SaleOrderCreateMxDto} from "@/module/saleOrder/dto/mx/saleOrderCreateMx.dto";

export class SaleOrderUpdateMxDto extends SaleOrderCreateMxDto{
    //销售订单头id
    @IsInt()
    @NotEquals(0)
    saleOrderId: number = 0;

    constructor() {
        super()
    }
}
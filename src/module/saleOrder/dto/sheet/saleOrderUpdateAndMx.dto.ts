import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {SaleOrderCreateAndMxDto} from "@/module/saleOrder/dto/sheet/saleOrderCreateAndMx.dto";

export class SaleOrderUpdateAndMxDto extends SaleOrderCreateAndMxDto{

    @IsInt()
    @NotEquals(0)
    saleOrderId: number = 0;


    constructor() {
        super();
    }
}
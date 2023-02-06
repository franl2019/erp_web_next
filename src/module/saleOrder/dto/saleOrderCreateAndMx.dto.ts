import {ISaleOrderAndMxDto} from "@/module/saleOrder/saleOrder";
import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";
import {
    IsArray,
} from "@/utils/verifyParam/customValidationDecorators";
import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";

export class SaleOrderCreateAndMxDto extends SaleOrderCreateDto implements ISaleOrderAndMxDto{
    @IsArray()
    saleOrderMx: ISaleOrderMx[];

    constructor() {
        super();
        this.saleOrderMx = []
    }
}
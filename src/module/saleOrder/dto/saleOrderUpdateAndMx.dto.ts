import {SaleOrderUpdateDto} from "@/module/saleOrder/dto/head/saleOrderUpdate.dto";
import {ISaleOrderAndMxDto} from "@/module/saleOrder/saleOrder";
import {ISaleOrderMx} from "@/module/saleOrder/saleOrderMx";
import {IsArray} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOrderUpdateAndMxDto extends SaleOrderUpdateDto implements ISaleOrderAndMxDto {

    @IsArray()
    saleOrderMx: ISaleOrderMx[] = [];

    constructor() {
        super();
    }
}
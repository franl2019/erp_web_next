import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";
import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOrderUpdateDto extends SaleOrderCreateDto{

    @IsInt()
    saleOrderId:number = 0;


    @IsString()
    saleOrderCode:string = "";

    constructor() {
        super();
    }
}
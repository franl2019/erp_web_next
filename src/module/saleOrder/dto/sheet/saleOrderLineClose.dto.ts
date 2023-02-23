import {IsBoolean} from "class-validator";
import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOrderLineCloseDto {
    @IsInt()
    @NotEquals(0)
    saleOrderId:number;

    @IsInt()
    saleOrderMxId:number;

    @IsBoolean()
    lineClose: boolean;


    constructor(saleOrderId: number, saleOrderMxId: number, lineClose: boolean) {
        this.saleOrderId = saleOrderId;
        this.saleOrderMxId = saleOrderMxId;
        this.lineClose = lineClose;
    }
}
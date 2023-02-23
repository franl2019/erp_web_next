import {IsNumber,IsInt,NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOrderStopMxDto {
    @IsInt()
    @NotEquals(0)
    saleOrderId:number = 0;

    @IsInt()
    saleOrderMxId:number = 0;

    @IsNumber()
    stopQty:number = 0;

    constructor(saleOrderId: number, saleOrderMxId: number, stopQty: number) {
        this.saleOrderId = saleOrderId;
        this.saleOrderMxId = saleOrderMxId;
        this.stopQty = stopQty;
    }
}
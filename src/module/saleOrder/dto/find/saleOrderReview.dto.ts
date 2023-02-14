import {IsInt} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOrderReviewDto {
    @IsInt()
    saleOrderId: number;

    constructor(saleOrderId: number) {
        this.saleOrderId = saleOrderId
    }
}
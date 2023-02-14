import {
    IsInt,
    NotEquals
} from "@/utils/verifyParam/customValidationDecorators";

export class SaleOrderFindMxDto {
    @IsInt()
    @NotEquals(0)
    saleOrderId: number = 0;
}
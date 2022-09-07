import {IProductOtherUnitMx} from "@/module/productOtherUnit/productOtherUnitMx";
import {IsInt, NotEquals} from "class-validator";

export class ProductOtherUnitMxCreateDto implements IProductOtherUnitMx{
    @IsInt()
    @NotEquals(0)
    productOtherUnitId: number = 0;

    @IsInt()
    @NotEquals(0)
    conversionRate: number = 0;

    productid: number = 0;

    creater: string | null = null;
    createdAt: Date | null = null;
}
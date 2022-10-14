import {IsInt, NotEquals} from "@/utils/verifyParam/customValidationDecorators";

export class ProductOtherUnitDeleteDto{
    //id
    @IsInt()
    @NotEquals(0)
    productOtherUnitId: number = 0;
}
import {IsInt, NotEquals} from "class-validator";

export class ProductOtherUnitDeleteDto{
    //id
    @IsInt()
    @NotEquals(0)
    productOtherUnitId: number = 0;
}
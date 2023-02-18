import {IsInt, IsString, NotEquals} from "@/utils/verifyParam/customValidationDecorators";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";

export class ProductOtherUnitUpdateDto implements IProductOtherUnit {
    //id
    @IsInt()
    @NotEquals(0)
    productOtherUnitId: number = 0;

    //辅助单位名称
    @IsString()
    productOtherUnitName: string = "";

    //辅助单位转换率
    @IsInt()
    @NotEquals(0)
    defaultConversionRate: number = 1;

    //使用率
    @IsInt()
    useflag: number = 1;

    //使用日期
    useflagDate: Date | null = null;

    creater: string = "";
    createdAt: Date | null = null;

    updater: string | null = null;
    updatedAt: Date | null = null;

    level1Review: number = 0;
    level1Name: string | null = null;
    level1Date: Date | null = null;

    level2Review: number = 0;
    level2Name: string | null = null;
    level2Date: Date | null = null;

    del_uuid: number = 0;
    deleter: string | null = null;
    deletedAt: Date | null = null;
}
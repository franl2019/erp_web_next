import {IsInt, IsString} from "@/utils/verifyParam/customValidationDecorators";
import {IProductOtherUnit} from "@/module/productOtherUnit/productOtherUnit";
import {IProductOtherUnitMx} from "@/module/productOtherUnit/productOtherUnitMx";

export class ProductOtherUnitFindDto implements IProductOtherUnit,IProductOtherUnitMx{
    //id
    @IsInt()
    productOtherUnitId: number = 0;

    //辅助单位名称
    @IsString()
    productOtherUnitName: string = "";

    //辅助单位转换率
    @IsInt()
    defaultConversionRate: number = 0;

    //使用
    useflag: number = 1;
    useflagDate: Date | null =  null;

    creater: string = "";
    createdAt: Date | null = null;
    deleter: string | null =  null;
    del_uuid: number = 0;
    deletedAt: Date | null =  null;
    level1Review: number = 0;
    level1Name: string | null =  null;
    level1Date: Date | null =  null;
    level2Review: number = 0;
    level2Name: string | null =  null;
    level2Date: Date | null =  null;
    updater: string | null =  null;
    updatedAt: Date | null =  null;
    conversionRate: number = 1;

    @IsInt()
    productid: number = 0;


}
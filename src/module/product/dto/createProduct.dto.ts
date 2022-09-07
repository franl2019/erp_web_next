import {IProductOtherUnitMx} from "@/module/productOtherUnit/productOtherUnitMx";

export interface ICreateProductDto {
    productcode: string;
    productname: string;
    spec: string;
    materials: string;
    unit: string;
    packunit: string;
    packqty: number;
    m3: number;
    length: number;
    width: number;
    height: number;
    remark1: string;
    remark2: string;
    remark3: string;
    remark4: string;
    remark5: string;
    remark6: string;
    remark7: string;
    remark8: string;
    remark9: string;
    remark10: string;
    useflag: number;
    creater: string;
    createdAt: Date | null;
    productareaid: number | null;
    warehouseid: number | null;
}

export interface IAddProductOtherUnitMxList extends ICreateProductDto{
    productOtherUnitMxList:IProductOtherUnitMx[]
}

export class CreateProductDto implements IAddProductOtherUnitMxList {
    productcode: string = "";
    productname: string = "";
    spec: string = "";
    materials: string = "";
    unit: string = "";
    packunit: string = "";
    packqty: number = 1;
    m3: number = 0;
    length: number = 0;
    width: number = 0;
    height: number = 0;
    remark1: string = "";
    remark2: string = "";
    remark3: string = "";
    remark4: string = "";
    remark5: string = "";
    remark6: string = "";
    remark7: string = "";
    remark8: string = "";
    remark9: string = "";
    remark10: string = "";
    useflag: number = 1;
    creater: string = "";
    createdAt: Date | null = null;
    productareaid: number | null = null;
    warehouseid: number | null = null;
    productOtherUnitMxList: IProductOtherUnitMx[] = [];
}
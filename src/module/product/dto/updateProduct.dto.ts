import {IProductOtherUnitMx} from "@/module/productOtherUnit/productOtherUnitMx";
import {IProduct} from "@/module/product/product";

export interface IUpdateProductDto {
    productid: number;
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
    updater: string;
    updatedAt: Date | null;
    productareaid: number;
    warehouseid: number;
}

interface IUpdateProductOtherUnitMxList extends IUpdateProductDto{
    productOtherUnitMxList:IProductOtherUnitMx[]
}

export class UpdateProductDto implements IUpdateProductOtherUnitMxList {
    productid: number = 0;
    productcode: string = "";
    productname: string = "";
    spec: string = "";
    materials: string = "";
    unit: string = "";
    packunit: string = "";
    packqty: number = 0;
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
    useflag: number = 0;
    updater: string = "";
    updatedAt: Date | null = new Date();
    productareaid: number = 0;
    warehouseid: number = 0;
    productOtherUnitMxList: IProductOtherUnitMx[] = [];


    public productToUpdateProductDto(product:IProduct){
        this.productid = product.productid;
        this.productcode = product.productcode;
        this.productname = product.productname;
        this.spec = product.spec;
        this.materials = product.materials;
        this.unit = product.unit;
        this.packunit = product.packunit;
        this.packqty = product.packqty;
        this.m3 = product.m3;
        this.length = product.length;
        this.width = product.width;
        this.height = product.height;
        this.remark1 = product.remark1;
        this.remark2 = product.remark2;
        this.remark3 = product.remark3;
        this.remark4 = product.remark4;
        this.remark5 = product.remark5;
        this.remark6 = product.remark6;
        this.remark7 = product.remark7;
        this.remark8 = product.remark8;
        this.remark9 = product.remark9;
        this.remark10 = product.remark10;
        this.useflag = product.useflag;
        this.updater = product.updater;
        this.updatedAt = product.updatedAt;
        this.productareaid = product.productareaid;
        this.warehouseid = product.warehouseid;
    }
}
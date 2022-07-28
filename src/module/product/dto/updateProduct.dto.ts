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
    updatedAt: Date;
    productareaid: number;
    warehouseid: number;
}

export class UpdateProductDto implements IUpdateProductDto {
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
    updatedAt: Date = new Date();
    productareaid: number = 0;
    warehouseid: number = 0;
}
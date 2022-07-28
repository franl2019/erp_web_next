export interface IFindInventoryDto {
    warehouseids: number[];
    clientid: number;
    operateareaids: number[];
    useflag: number;
    productcode: string;
    productname: string;
    materials: string;
    spec: string;
    materials_d: string;
    spec_d: string;
    remark: string
    remarkmx: string
    unit: string;
    productareaid: number;
    page: number;
    pagesize: number;
}

export class FindInventoryDto implements IFindInventoryDto {
    clientid: number = 0;
    materials: string = "";
    materials_d: string = "";
    operateareaids: number[] = [];
    page: number = 0;
    pagesize: number = 0;
    productareaid: number = 0;
    productcode: string = "";
    productname: string = "";
    remark: string = "";
    remarkmx: string = "";
    spec: string = "";
    spec_d: string = "";
    unit: string = "";
    useflag: number = 0;
    warehouseids: number[] = [];
}
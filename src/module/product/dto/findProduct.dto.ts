export interface IFindProductDto {
    warehouseids: number[];
    productareaid:number;
    search: string;
    page: number;
    pagesize: number;
    useflag:number;
}

export class FindProductDto implements IFindProductDto{
    warehouseids: number[] = [];
    productareaid:number = 0;
    search: string = "";
    page: number = 0;
    pagesize: number = 0;
    useflag:number = 1;
}
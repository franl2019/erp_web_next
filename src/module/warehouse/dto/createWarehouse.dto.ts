export interface ICreateWarehouseDto {
    warehousename: string;
    warehousecode: string;
    warehousetype: number;
    useflag: number;
}

export class CreateWarehouseDto implements ICreateWarehouseDto {
    warehousename: string = "";
    warehousecode: string = "";
    warehousetype: number = 0;
    useflag: number = 1;
}
export interface IUpdateWarehouseDto {
    warehouseid: number;
    warehousename: string;
    warehousecode: string;
    warehousetype: number;
    useflag: number;
}

export class UpdateWarehouseDto implements IUpdateWarehouseDto {
    warehouseid: number = 0;
    warehousename: string = "";
    warehousecode: string = "";
    warehousetype: number = 0;
    useflag: number = 0;
}

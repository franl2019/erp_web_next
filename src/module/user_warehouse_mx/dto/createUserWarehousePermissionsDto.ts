export interface ICreateUserWarehousePermissionsDto {
    userid: number;
    warehouseid: number | null;
}

export class CreateUserWarehousePermissionsDto implements ICreateUserWarehousePermissionsDto {
    userid: number = 0;
    warehouseid: number | null = null;
}
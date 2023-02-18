export interface IDeleteUserWarehousePermissionsDto {
    userid: number;
    warehouseid: number;
}

export class DeleteUserWarehousePermissionsDto implements IDeleteUserWarehousePermissionsDto {
    userid: number = 0;
    warehouseid: number = 0;
}
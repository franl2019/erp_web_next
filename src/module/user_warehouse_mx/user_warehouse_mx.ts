export interface IUser_warehouse_mx {
    userid: number;
    warehouseid: number;
    warehousecode: string;
    warehousename: string;
    creater: string;
    createdAt: Date | null;
}

export class User_warehouse_mx implements IUser_warehouse_mx {
    userid: number = 0;
    warehouseid: number = 0;
    warehousecode: string = "";
    warehousename: string = "";
    creater: string = "";
    createdAt: Date | null = null;
}
export interface IInventory {
    inventoryid: number;
    spec: string;
    spec_d: string;
    materials: string;
    materials_d: string;
    batchNo:string;
    remark: string;
    remarkmx: string;
    qty: number;
    updatedAt: Date | null;
    updater: string;
    latest_sale_price: number;
    productid: number;
    clientid: number;
    warehouseid: number;
}

export interface IInventoryForSelect extends IInventory{
    rowNodeId:number;
}

export class Inventory implements IInventory {
    inventoryid: number = 0;
    spec: string = "";
    spec_d: string = "";
    materials: string = "";
    materials_d: string = "";
    remark: string = "";
    remarkmx: string = "";
    qty: number = 0;
    updatedAt: Date | null = null;
    updater: string = "";
    latest_sale_price: number = 0;
    productid: number = 0;
    clientid: number = 0;
    warehouseid: number = 0;
    batchNo: string = "";
}
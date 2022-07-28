import {IInventory} from "@/module/inventory/inventory";

export interface IFindInventory extends IInventory{
    warehousename: string;
    clientcode: string;
    clientname: string;
    productcode: string;
    productname: string;
    materials: string;
    spec: string;
    unit: string;
    packunit: string;
    packqty: number;
    m3: number;
    length: number;
    width: number;
    height: number;
}
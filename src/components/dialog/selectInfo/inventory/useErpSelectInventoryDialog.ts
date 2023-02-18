import ErpSelectInventoryDialog from '@/components/dialog/selectInfo/inventory/ErpSelectInventoryDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import {IFindInventory} from "@/module/inventory/FindInventory";

interface IDialogOption {
    warehouseid:number;
    clientid:number;
}

export function useErpSelectInventoryDialog(option: IDialogOption) {
   return erpDialogFactory<IFindInventory[]>(ErpSelectInventoryDialog,option);
}
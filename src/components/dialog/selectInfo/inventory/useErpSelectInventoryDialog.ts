import ErpSelectInventoryDialog from '@/components/dialog/selectInfo/inventory/ErpSelectInventoryDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    warehouseid:number;
    clientid:number;
}

export function useErpSelectInventoryDialog(option: IDialogOption) {
    erpDialogFactory(ErpSelectInventoryDialog,option);
}
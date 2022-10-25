import ErpSelectInventoryDialog from '@/components/dialog/selectInfo/inventory/ErpSelectInventoryDialog.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    warehouseid:number;
    clientid:number;
}

export function useErpSelectInventoryDialog(option: IDialogOption) {
    useErpDialogDemo(ErpSelectInventoryDialog,option);
}
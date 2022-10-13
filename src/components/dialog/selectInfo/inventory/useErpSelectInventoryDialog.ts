import ErpSelectInventoryDialog from '@/components/dialog/selectInfo/inventory/ErpSelectInventoryDialog.vue'
import {useDialogDemo} from "@/utils/useDialog";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    warehouseid:number;
    clientid:number;
}

export function useErpSelectInventoryDialog(option: IDialogOption) {
    useDialogDemo(ErpSelectInventoryDialog,option);
}
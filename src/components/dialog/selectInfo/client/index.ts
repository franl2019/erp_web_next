import ErpSelectClientDialog from '@/components/dialog/selectInfo/client/ErpSelectClientDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function useErpSelectClientDialog(option: IDialogOption) {
    erpDialogFactory(ErpSelectClientDialog, option);
}


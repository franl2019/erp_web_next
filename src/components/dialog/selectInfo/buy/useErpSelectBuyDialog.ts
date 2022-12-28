import ErpSelectBuyDialog from '@/components/dialog/selectInfo/buy/ErpSelectBuyDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function useErpSelectBuyDialog(option: IDialogOption) {
    erpDialogFactory(ErpSelectBuyDialog,option);
}

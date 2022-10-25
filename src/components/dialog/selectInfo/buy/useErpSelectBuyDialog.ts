import ErpSelectBuyDialog from '@/components/dialog/selectInfo/buy/ErpSelectBuyDialog.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function useErpSelectBuyDialog(option: IDialogOption) {
    useErpDialogDemo(ErpSelectBuyDialog,option);
}

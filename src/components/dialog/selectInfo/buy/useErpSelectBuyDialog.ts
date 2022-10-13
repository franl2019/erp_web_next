import ErpSelectBuyDialog from '@/components/dialog/selectInfo/buy/ErpSelectBuyDialog.vue'
import {useDialogDemo} from "@/utils/useDialog";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function useErpSelectBuyDialog(option: IDialogOption) {
    useDialogDemo(ErpSelectBuyDialog,option);
}

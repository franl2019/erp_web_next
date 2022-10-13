import ErpSelectProductDialog from '@/components/dialog/selectInfo/product/ErpSelectProductDialog.vue'
import {useDialogDemo} from "@/utils/useDialog";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function useErpSelectProductDialog(option: IDialogOption) {
    useDialogDemo(ErpSelectProductDialog, option);
}

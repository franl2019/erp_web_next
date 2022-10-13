import ErpSelectClientDialog from '@/components/dialog/selectInfo/client/ErpSelectClientDialog.vue'
import {useDialogDemo} from "@/utils/useDialog";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function useErpSelectClientDialog(option: IDialogOption) {
    useDialogDemo(ErpSelectClientDialog, option);
}


import ErpSelectClientDialog from '@/components/dialog/selectInfo/client/ErpSelectClientDialog.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
}

export function useErpSelectClientDialog(option: IDialogOption) {
    useErpDialogDemo(ErpSelectClientDialog, option);
}


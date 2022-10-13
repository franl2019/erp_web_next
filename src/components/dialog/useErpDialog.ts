import ErpDialog from './ErpDialog.vue'
import {useDialogDemo} from "@/utils/useDialog";

export interface IErpDialogOption {
    unmount?: Function;
    title?: string;
    message: string;
    ok?: Function;
    close?: Function;
    okBtnVisible?: boolean;
    closeBtnVisible?: boolean;
}

export default function useErpDialog(option: IErpDialogOption) {
    useDialogDemo<IErpDialogOption>(ErpDialog,option)
}


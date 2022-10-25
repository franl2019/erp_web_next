import ErpDialog from './ErpDialog.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";

export interface IErpDialogOption {
    unmount?: Function;
    title?: string;
    message: string;
    ok?: Function;
    close?: Function;
    okBtnVisible?: boolean;
    closeBtnVisible?: boolean;
}

export default function useErpDialog<T = boolean>(option: IErpDialogOption):Promise<T> {
   return useErpDialogDemo<IErpDialogOption>(ErpDialog,option)
}


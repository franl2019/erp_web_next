import ErpDialog from './ErpDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";

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
   return erpDialogFactory<IErpDialogOption>(ErpDialog,option)
}


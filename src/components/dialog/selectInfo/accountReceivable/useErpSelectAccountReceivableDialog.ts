import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import ErpSelectAccountReceivableDialog
    from '@/components/dialog/selectInfo/accountReceivable/ErpSelectAccountReceivableDialog.vue';

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    clientid?: number
    accountsReceivableTypeList: number[]
}

export function useErpSelectAccountReceivableDialog(option: IDialogOption) {
  return erpDialogFactory(ErpSelectAccountReceivableDialog, option);
}

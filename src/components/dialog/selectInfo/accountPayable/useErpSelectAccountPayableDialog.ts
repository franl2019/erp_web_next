import ErpSelectAccountPayableDialog from '@/components/dialog/selectInfo/accountPayable/ErpSelectAccountPayableDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    buyid:number;
    accountsPayableTypeList:number[];
}

export function useErpSelectAccountPayableDialog(option: IDialogOption) {
  return erpDialogFactory(ErpSelectAccountPayableDialog,option);
}


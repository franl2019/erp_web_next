import ErpSelectAccountPayableDialog from '@/components/dialog/selectInfo/accountPayable/ErpSelectAccountPayableDialog.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    buyid:number;
    accountsPayableTypeList:number[];
}

export function useErpSelectAccountPayableDialog(option: IDialogOption) {
   useErpDialogDemo(ErpSelectAccountPayableDialog,option);
}


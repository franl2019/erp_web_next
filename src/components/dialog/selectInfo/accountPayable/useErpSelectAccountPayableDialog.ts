import ErpSelectAccountPayableDialog from '@/components/dialog/selectInfo/accountPayable/ErpSelectAccountPayableDialog.vue'
import {useDialogDemo} from "@/utils/useDialog";

interface IDialogOption {
    unmount?: Function;
    ok?: Function;
    close?: Function;
    buyid:number;
    accountsPayableTypeList:number[];
}

export function useErpSelectAccountPayableDialog(option: IDialogOption) {
   useDialogDemo(ErpSelectAccountPayableDialog,option);
}


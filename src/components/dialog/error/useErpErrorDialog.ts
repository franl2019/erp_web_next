import ErpErrorDialog from '@/components/dialog/error/ErpErrorDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import {IErpDialogOption} from "@/components/dialog/useErpDialog";

export interface IErpErrorDialogOption extends IErpDialogOption{
   messageList:string[]
}

export default function useErpErrorDialog(option: IErpErrorDialogOption) {
   return erpDialogFactory(ErpErrorDialog,option)
}


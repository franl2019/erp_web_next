import ErpErrorDialog from '@/components/dialog/error/ErpErrorDialog.vue'
import {useDialogDemo} from "@/utils/useDialog";
import {IErpDialogOption} from "@/components/dialog/useErpDialog";

export interface IErpErrorDialogOption extends IErpDialogOption{
   messageList:string[]
}

export default function useErpErrorDialog(option: IErpErrorDialogOption) {
    useDialogDemo<IErpDialogOption>(ErpErrorDialog,option)
}


import ErpErrorDialog from '@/components/dialog/error/ErpErrorDialog.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";
import {IErpDialogOption} from "@/components/dialog/useErpDialog";

export interface IErpErrorDialogOption extends IErpDialogOption{
   messageList:string[]
}

export default function useErpErrorDialog(option: IErpErrorDialogOption) {
    useErpDialogDemo<IErpDialogOption>(ErpErrorDialog,option)
}


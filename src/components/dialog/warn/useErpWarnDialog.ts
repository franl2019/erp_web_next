import ErpWarnDialog from '../warn/ErpWarnDialog.vue.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";
import {IErpDialogOption} from "@/components/dialog/useErpDialog";

export default function useErpWarnDialog<T = boolean>(option: IErpDialogOption):Promise<T> {
   return useErpDialogDemo<IErpDialogOption>(ErpWarnDialog, {...option,closeBtnVisible:false})
}


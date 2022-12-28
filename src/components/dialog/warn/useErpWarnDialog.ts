import ErpWarnDialog from '../warn/ErpWarnDialog.vue.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import {IErpDialogOption} from "@/components/dialog/useErpDialog";

export default function useErpWarnDialog<T = boolean>(option: IErpDialogOption):Promise<T> {
   return erpDialogFactory<IErpDialogOption>(ErpWarnDialog, {...option,closeBtnVisible:false})
}


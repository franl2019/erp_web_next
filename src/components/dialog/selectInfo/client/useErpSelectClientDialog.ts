import ErpSelectClientDialog from '@/components/dialog/selectInfo/client/ErpSelectClientDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import {IClient} from "@/module/client/client";


export function useErpSelectClientDialog() {
   return erpDialogFactory<IClient>(ErpSelectClientDialog,{});
}


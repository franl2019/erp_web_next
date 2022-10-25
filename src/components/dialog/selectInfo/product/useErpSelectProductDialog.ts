import ErpSelectProductDialog from '@/components/dialog/selectInfo/product/ErpSelectProductDialog.vue'
import {useErpDialogDemo} from "@/components/dialog/useErpDialogDemo";

export function useErpSelectProductDialog<T>():Promise<T> {
   return useErpDialogDemo(ErpSelectProductDialog, {});
}

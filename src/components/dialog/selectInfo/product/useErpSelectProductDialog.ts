import ErpSelectProductDialog from '@/components/dialog/selectInfo/product/ErpSelectProductDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";

export function useErpSelectProductDialog<T>():Promise<T> {
   return erpDialogFactory(ErpSelectProductDialog, {});
}

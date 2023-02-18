import ErpSelectBuyDialog from '@/components/dialog/selectInfo/buy/ErpSelectBuyDialog.vue'
import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";


export function useErpSelectBuyDialog() {
  return erpDialogFactory(ErpSelectBuyDialog, {});
}

import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import saleOrderStopQtyInputDialog from "../../saleOrderStopQtyInputDialog.vue";

export function useSaleOrderStopQtyDialog<T>(stopQty:number):Promise<T> {
    return erpDialogFactory(saleOrderStopQtyInputDialog, {
        stopQty
    });
}

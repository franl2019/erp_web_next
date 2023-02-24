import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import saleOrderSelectDialog from "@/view/saleOrder/hock/dialog/selectSaleOrderMx/saleOrderSelectDialog.vue";
import {SaleOrderMxReportFindDto} from "@/module/report/saleOrderMxReport/saleOrderMxReportFind.dto";
import {ISaleOrderMxOrSaleOrderOrProductOrAmt} from "@/module/saleOrder/saleOrderMx";

export function useSelectSaleOrderDialog(findDto:SaleOrderMxReportFindDto){
    return erpDialogFactory<ISaleOrderMxOrSaleOrderOrProductOrAmt[]>(saleOrderSelectDialog, {findDto});
}
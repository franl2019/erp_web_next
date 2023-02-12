import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import ErpTableFilterDialog from "@/components/table/components/filter/ErpTableFilterDialog.vue";

export interface TableFilterDialogOption {
    colId:string;
    colValue:string
}

export function useTableFilterDialog(findDto:any,defaultFindDto:any,option?:TableFilterDialogOption) {
    return erpDialogFactory<any>(ErpTableFilterDialog,{
        defaultFindDto,
        findDto,
        ...option
    });
}
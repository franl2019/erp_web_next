import {erpDialogFactory} from "@/components/dialog/erpDialogFactory";
import ErpTableEditOptionDialog from "@/components/table/components/OptionDialog/ErpTableEditOptionDialog.vue";
import {TableCol} from "@/components/table/TableCol";

export function useTableOptionDialog(option:{gridCol:TableCol}) {
    return erpDialogFactory(ErpTableEditOptionDialog,option)
}
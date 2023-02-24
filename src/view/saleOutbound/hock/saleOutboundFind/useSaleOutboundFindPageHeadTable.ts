import {Ref} from "vue";
import {ITableRef} from "@/components/table/type";

export function useSaleOutboundFindPageHeadTable(
    saleOutboundTableRef: Ref<ITableRef> | undefined
) {

    function selectRow(outboundId: number) {
        saleOutboundTableRef?.value.getGridApi().getRowNode('' + outboundId)?.setSelected(true);
    }

    function loadSaleOutbound() {
        saleOutboundTableRef?.value.initTableData();
    }

    function getSelectedRow() {
        const saleOutboundList = saleOutboundTableRef?.value.getGridApi().getSelectedRows();
    }

}
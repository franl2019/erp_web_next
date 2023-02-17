import {ref, Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {ISaleOrder} from "@/module/saleOrder/saleOrder";
import {SaleOrderFindDto} from "@/module/saleOrder/dto/find/saleOrderFind.dto";

export function useSaleOrderFindHeadTable(
    saleOrderFindHeadTableRef: Ref<ITableRef | undefined>
) {

    const saleOrderFindDto = ref(new SaleOrderFindDto());

    function getRowNodeId(data:ISaleOrder){
        return data.saleOrderId
    }

    async function loadSaleOrderHeadTable() {
        await saleOrderFindHeadTableRef.value?.initTableData();
    }

    async function getSaleOrderHeadTableSelectedOrder(): Promise<ISaleOrder | undefined> {
        const saleOrderSelectedList = saleOrderFindHeadTableRef.value?.getGridApi().getSelectedRows() as ISaleOrder[];
        if (saleOrderSelectedList && saleOrderSelectedList.length > 0) {
            return saleOrderSelectedList[0]
        } else {
            return undefined
        }
    }

    async function selectSaleOrder(saleOrderId: number) {
        await saleOrderFindHeadTableRef.value?.getGridApi().getRowNode(String(saleOrderId))?.setSelected(true);
    }

    return {
        saleOrderFindDto,
        getRowNodeId,
        selectSaleOrder,
        loadSaleOrderHeadTable,
        getSaleOrderHeadTableSelectedOrder
    }
}
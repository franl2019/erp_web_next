import {ITableRef} from "@/components/table/type";
import {ref, Ref} from "vue";
import {SaleOrderFindMxDto} from "@/module/saleOrder/dto/find/saleOrderMxFind.dto";

export function useSaleOrderFindMxTable(
    saleOrderFindMxTableRef: Ref<ITableRef | undefined>
) {

    const saleOrderFindMxDto = ref(new SaleOrderFindMxDto());

    async function loadSaleOrderMxTable(saleOrderId: number) {
        saleOrderFindMxDto.value.saleOrderId = saleOrderId;
        await saleOrderFindMxTableRef.value?.initTableData();
    }
    
    function emptySaleOrderMxTable() {
        saleOrderFindMxTableRef.value?.initTableDataList();
    }

    return {
        saleOrderFindMxDto,
        loadSaleOrderMxTable,
        emptySaleOrderMxTable
    }
}
import {ref, Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {SaleOrderUpdateDto} from "@/module/saleOrder/dto/head/saleOrderUpdate.dto";

export function useSaleOrderEditView(
    saleOrderEditTableRef: Ref<ITableRef | undefined>
) {

    const saleOrderDto = ref<SaleOrderCreateDto | SaleOrderUpdateDto>(new SaleOrderCreateDto());
    const saleOrderService = new SaleOrderService();

    async function onClickSaveButton() {

    }

    function onClickL1ReviewButton() {

    }

    function onClickUnL1ReviewButton() {

    }
    
    function onClickDeleteButton() {
        
    }

    function onClientChange() {

    }

    return{
        saleOrderDto,
        onClickSaveButton,
        onClickL1ReviewButton,
        onClickUnL1ReviewButton,
        onClickDeleteButton,
        onClientChange,
    }
}
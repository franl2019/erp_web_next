import {ref, Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";

export function useSaleOrderEditView(
    saleOrderEditTableRef: Ref<ITableRef | undefined>
) {

    const saleOrderCreateDto = ref(new SaleOrderCreateDto());
    const saleOrderService = new SaleOrderService();

    async function onClickSaveButton() {
       const saleOrderAndMxDto = (await saleOrderService.create(saleOrderCreateDto.value))[0];
        console.log(saleOrderAndMxDto)
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
        saleOrderCreateDto,
        onClickSaveButton,
        onClickL1ReviewButton,
        onClickUnL1ReviewButton,
        onClickDeleteButton,
        onClientChange,
    }
}
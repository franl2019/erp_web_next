import {ref, Ref} from "vue";
import {ITableRef} from "@/components/table/type";
import {SaleOrderCreateDto} from "@/module/saleOrder/dto/head/saleOrderCreate.dto";
import {SaleOrderService} from "@/module/saleOrder/saleOrder.service";
import {SaleOrderCreateAndMxDto} from "@/module/saleOrder/dto/saleOrderCreateAndMx.dto";

export function useSaleOrderCreate(
    saleOrderEditTableRef: Ref<ITableRef | undefined>
) {

    const saleOrderCreateDto = ref(new SaleOrderCreateDto());
    const saleOrderService = new SaleOrderService();

    async function onClickSaveButton() {
        const saleOrderCreateAndMxDto = new SaleOrderCreateAndMxDto()
        saleOrderCreateAndMxDto.setSaleOrder(saleOrderCreateDto.value);
        saleOrderCreateAndMxDto.setSaleOrderCreateMxList([]);
        console.log(saleOrderCreateAndMxDto)
        const saleOrderAndMxDto = (await saleOrderService.create(saleOrderCreateAndMxDto))[0];
    }

    function onClickL1ReviewButton() {

    }

    function onClickUnL1ReviewButton() {

    }

    function onClickDeleteButton() {

    }

    function onClientChange() {

    }

    return {
        saleOrderCreateDto,
        onClickSaveButton,
        onClickL1ReviewButton,
        onClickUnL1ReviewButton,
        onClickDeleteButton,
        onClientChange,
    }
}